// Project links are verified against the corresponding public repositories.
const skills = {
  "Languages": ["C++", "JavaScript (ES6+)", "HTML5 and CSS3", "8086 Assembly"],
  "Frontend": ["React", "Responsive layout", "Context API and Redux Toolkit"],
  "Backend and data": ["Node.js", "SQLite", "REST APIs"],
  "Tools": ["Git and GitHub", "CMake", "EMU8086", "Cloud systems basics"]
};

const projects = [
  {
    title: "Rayva Cloud",
    summary: "A distributed cloud simulation with a C++ core, a Node.js service layer and a React dashboard.",
    detail: "Rayva Cloud simulates how work is spread across machines in a small cloud. The C++ engine models the nodes, Node.js exposes them over an API, SQLite stores state and a React front end shows what is happening.",
    learned: "How to split a system into parts that talk to each other cleanly, and how a CMake build ties a C++ project together.",
    tags: ["C++", "Node.js", "React", "SQLite", "CMake"],
    source: "https://github.com/AbdulRehmanYasir/Rayva-Cloud/tree/main/src"
  },
  {
    title: "Wanderly",
    summary: "A responsive tour and travel website built in React.",
    detail: "Wanderly is a multi-section travel site built from reusable components. It was my first real exercise in breaking a design into components and passing data through props.",
    learned: "Component decomposition, props drilling and why state management tools exist.",
    tags: ["React", "CSS", "Responsive design"],
    source: "https://github.com/AbdulRehmanYasir/Tour-Travel-App/tree/main/src"
  },
  {
    title: "Mission Control",
    summary: "A spacecraft flight computer written for the 8086 in assembly.",
    detail: "A lab project for Computer Organization and Assembly Language where the flight computer logic runs in 8086 real mode. Programs are tested in the EMU8086 emulator.",
    learned: "How registers, memory addressing and interrupts really work, with no framework hiding them.",
    tags: ["8086 Assembly", "EMU8086"],
    source: "https://github.com/AbdulRehmanYasir/mission-control-spacecraft-flight-computer/tree/main/MissionControl"
  },
  {
    title: "Astra Vindex",
    summary: "A browser-based space combat survival game built with React and TypeScript.",
    detail: "Astra Vindex is a browser-based space combat survival game focused on dynamic combat, mission-driven gameplay, enemy progression and responsive 2D Canvas gameplay.",
    learned: "Building an interactive browser game with a React interface, TypeScript game systems and a dedicated game engine.",
    tags: ["React", "TypeScript", "2D Canvas", "Game development"],
    source: "https://github.com/AbdulRehmanYasir/Astra-Vindex/tree/main/src",
    demo: "https://abdulrehmanyasir.github.io/Astra-Vindex/"
  }
];

const $ = (s) => document.querySelector(s);
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage blocked */ } }
};

/* theme */
const root = document.documentElement;
const themeBtn = $("#theme-toggle");
function setTheme(t) {
  root.dataset.theme = t;
  themeBtn.textContent = t === "dark" ? "Light" : "Dark";
  store.set("theme", t);
}
setTheme(store.get("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
themeBtn.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

/* mobile menu */
const menuBtn = $("#menu-btn");
const nav = $("#nav");
function toggleMenu(open) {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
menuBtn.addEventListener("click", () => toggleMenu(!nav.classList.contains("open")));
nav.addEventListener("click", (e) => { if (e.target.tagName === "A") toggleMenu(false); });

/* skills */
$("#skills-grid").innerHTML = Object.entries(skills).map(([group, items]) =>
  `<div class="skill-group"><h3>${group}</h3><ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul></div>`
).join("");

/* projects and modal */
const list = $("#project-list");
list.innerHTML = projects.map((p, i) => `
  <li><article class="project-row">
    <h3>${p.title}</h3>
    <p>${p.summary}</p>
    <ul class="tags">${p.tags.map((t) => `<li>${t}</li>`).join("")}</ul>
    <div class="project-actions">
      <button class="project-details" type="button" data-index="${i}">Details</button>
      <a class="project-link" href="${p.source}" target="_blank" rel="noopener noreferrer">Source Code</a>
      ${p.demo ? `<a class="project-link primary-link" href="${p.demo}" target="_blank" rel="noopener noreferrer">Live Demo</a>` : ""}
    </div>
  </article></li>`).join("");

const modal = $("#project-modal");
list.addEventListener("click", (e) => {
  const details = e.target.closest(".project-details");
  if (!details) return;
  const p = projects[details.dataset.index];
  $("#modal-title").textContent = p.title;
  $("#modal-desc").textContent = p.detail;
  $("#modal-learned").textContent = p.learned;
  $("#modal-tags").innerHTML = p.tags.map((t) => `<li>${t}</li>`).join("");
  $("#modal-link").href = p.source;
  $("#modal-link").hidden = !p.source;
  modal.showModal();
});
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

/* highlight current section in nav */
const links = [...nav.querySelectorAll("a")];
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));
