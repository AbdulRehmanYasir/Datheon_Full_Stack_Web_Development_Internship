const STORAGE_KEY = "taskbook.tasks.v1";

// ---- state ----
let tasks = loadFromLocalStorage();
let filter = "all";
let query = "";
let editingId = null;
let dragId = null;
let enteringId = null;

const $ = (s) => document.querySelector(s);
const listEl = $("#task-list");

// ---- storage ----
function loadFromLocalStorage() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(raw) ? raw.filter((task) =>
      task && typeof task.id === "string" && typeof task.text === "string"
    ).map((task) => ({
      id: task.id,
      text: task.text.slice(0, 120),
      category: ["Work", "Personal", "Study"].includes(task.category) ? task.category : "Personal",
      due: typeof task.due === "string" ? task.due : "",
      done: task.done === true
    })) : [];
  } catch {
    return [];
  }
}
function saveToLocalStorage() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); } catch { /* storage unavailable */ }
}
function commit() { saveToLocalStorage(); render(); }

// ---- CRUD ----
function addTask(text, category, due) {
  enteringId = globalThis.crypto?.randomUUID?.() || String(Date.now());
  tasks.unshift({ id: enteringId, text, category, due, done: false });
  commit();
  setTimeout(() => { enteringId = null; }, 350);
}
function toggleTask(id) {
  const t = tasks.find((x) => x.id === id);
  if (t) { t.done = !t.done; commit(); }
}
function updateTask(id, text) {
  const t = tasks.find((x) => x.id === id);
  if (t && text.trim()) t.text = text.trim();
  editingId = null;
  commit();
}
function deleteTask(id) {
  const el = listEl.querySelector(`[data-id="${id}"]`);
  const finish = () => { tasks = tasks.filter((t) => t.id !== id); commit(); };
  if (el) { el.classList.add("removing"); setTimeout(finish, 250); } else finish();
}
function clearCompleted() {
  tasks = tasks.filter((t) => !t.done);
  commit();
}

// ---- helpers ----
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const todayStr = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local time
function dueLabel(t) {
  if (!t.due) return "";
  const label = new Date(t.due + "T00:00").toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
  const late = !t.done && t.due < todayStr();
  return `<span class="${late ? "overdue" : ""}">${late ? "Overdue: " : "Due "}${label}</span>`;
}
function visibleTasks() {
  const q = query.trim().toLowerCase();
  return tasks.filter((t) =>
    (filter === "all" || (filter === "active" ? !t.done : t.done)) &&
    (!q || t.text.toLowerCase().includes(q) || t.category.toLowerCase().includes(q))
  );
}

// ---- render ----
function render() {
  const shown = visibleTasks();
  const canDrag = filter === "all" && !query.trim();

  listEl.innerHTML = shown.map((t) => `
    <li class="task ${t.done ? "done" : ""} ${t.id === enteringId ? "entering" : ""}" data-id="${t.id}" ${canDrag ? 'draggable="true"' : ""}>
      <span class="handle" aria-hidden="true">${canDrag ? "::" : ""}</span>
      <input class="check" type="checkbox" ${t.done ? "checked" : ""} aria-label="Mark ${esc(t.text)} complete">
      <div class="body">
        ${editingId === t.id
          ? `<input class="edit-input" value="${esc(t.text)}" maxlength="120" aria-label="Edit task">`
          : `<span class="title">${esc(t.text)}</span>`}
        <div class="meta"><span class="cat ${t.category}">${t.category}</span>${dueLabel(t)}</div>
      </div>
      <div class="actions">
        <button class="icon edit" aria-label="Edit task">Edit</button>
        <button class="icon del" aria-label="Delete task">Delete</button>
      </div>
    </li>`).join("");

  const active = tasks.filter((t) => !t.done).length;
  $("#summary").textContent = tasks.length
    ? `${active} to do, ${tasks.length - active} finished`
    : "Nothing here yet. Add your first task below.";
  $("#count").textContent = `${active} task${active === 1 ? "" : "s"} left`;
  $("#clear-done").hidden = tasks.every((t) => !t.done);

  const empty = $("#empty");
  empty.hidden = shown.length > 0;
  if (!shown.length) {
    empty.textContent = query.trim() ? "No tasks match your search."
      : filter === "completed" ? "Nothing completed yet."
      : filter === "active" ? "All caught up. Nothing active."
      : "Your list is empty.";
  }

  const input = listEl.querySelector(".edit-input");
  if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
}

// ---- events ----
$("#task-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = $("#task-input").value.trim();
  if (!text) return;
  addTask(text, $("#task-category").value, $("#task-due").value);
  e.target.reset();
  $("#task-input").focus();
});

document.querySelector(".filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  filter = btn.dataset.filter;
  document.querySelectorAll(".chip").forEach((c) => {
    const active = c === btn;
    c.classList.toggle("on", active);
    c.setAttribute("aria-pressed", active);
  });
  render();
});
$("#search").addEventListener("input", (e) => { query = e.target.value; render(); });
$("#clear-done").addEventListener("click", clearCompleted);

listEl.addEventListener("click", (e) => {
  const li = e.target.closest(".task");
  if (!li) return;
  const id = li.dataset.id;
  if (e.target.matches(".check")) toggleTask(id);
  else if (e.target.closest(".del")) deleteTask(id);
  else if (e.target.closest(".edit")) { editingId = id; render(); }
});
listEl.addEventListener("dblclick", (e) => {
  const title = e.target.closest(".title");
  if (title) { editingId = title.closest(".task").dataset.id; render(); }
});
listEl.addEventListener("keydown", (e) => {
  if (!e.target.matches(".edit-input")) return;
  const id = e.target.closest(".task").dataset.id;
  if (e.key === "Enter") updateTask(id, e.target.value);
  if (e.key === "Escape") { editingId = null; render(); }
});
listEl.addEventListener("focusout", (e) => {
  if (e.target.matches(".edit-input") && editingId) updateTask(e.target.closest(".task").dataset.id, e.target.value);
});

// drag and drop reordering
listEl.addEventListener("dragstart", (e) => {
  const li = e.target.closest(".task");
  if (!li) return;
  dragId = li.dataset.id;
  li.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
});
listEl.addEventListener("dragover", (e) => {
  const li = e.target.closest(".task");
  if (!li || !dragId) return;
  e.preventDefault();
  listEl.querySelectorAll(".over").forEach((x) => x.classList.remove("over"));
  li.classList.add("over");
});
listEl.addEventListener("drop", (e) => {
  const li = e.target.closest(".task");
  if (!li || !dragId || li.dataset.id === dragId) return;
  e.preventDefault();
  const from = tasks.findIndex((t) => t.id === dragId);
  const to = tasks.findIndex((t) => t.id === li.dataset.id);
  tasks.splice(to, 0, tasks.splice(from, 1)[0]);
  commit();
});
listEl.addEventListener("dragend", () => { dragId = null; render(); });

render();
