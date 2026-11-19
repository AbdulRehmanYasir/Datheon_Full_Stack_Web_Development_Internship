 <div align="center">

# 📋 TASKBOOK

### Task Management Application

A task manager built with HTML, CSS, and vanilla JavaScript to organize daily tasks, track progress, and manage deadlines.

**Plan. Organize. Get Things Done.**

</div>

---

## 📌 About

Taskbook is a browser-based task management application that supports creating, editing, completing, and deleting tasks.

It includes categories, due dates, status filters, drag-and-drop reordering, and localStorage persistence to keep tasks available after page reloads.

## ✨ Features

- **Task Management:** Create, view, edit, and delete tasks.
- **Quick Editing:** Edit tasks using the Edit button or double-click.
- **Categories:** Organize tasks into Work, Personal, and Study categories, each with its own colour.
- **Due Dates:** Assign deadlines and identify overdue tasks.
- **Status Filters:** View All, Active, or Completed tasks.
- **Live Search:** Find tasks as you type.
- **Drag and Drop:** Reorder tasks by dragging them.
- **Completion Animation:** Animated check indicator and strike-through effect.
- **Delete Animation:** Visual transition when removing tasks.
- **Data Persistence:** Saves tasks in localStorage.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling, animations, and responsive layout |
| JavaScript | Task management and application logic |
| localStorage | Persistent task storage |

## ⚙️ Task Management Functions

The application state is maintained in a single `tasks` array inside `script.js`.

| Function | Description |
|---|---|
| `addTask()` | Creates a new task |
| `toggleTask()` | Changes task completion status |
| `updateTask()` | Updates existing task details |
| `deleteTask()` | Removes a task |
| `saveToLocalStorage()` | Saves tasks in browser storage |
| `loadFromLocalStorage()` | Loads previously saved tasks |

## 📁 Repository Structure

```text id="taskb00k"
task-manager/
│
├── index.html
├── style.css
├── script.js
├── favicon.svg
└── README.md
```

## 🚀 Getting Started

**1. Clone the repository**

```bash id="t4sk21"
git clone https://github.com/AbdulRehmanYasir/Datheon_Full_Stack_Web_Development_Internship.git
```

**2. Open the task manager folder**

```bash id="t4sk22"
cd Datheon_Full_Stack_Web_Development_Internship/task-manager
```

**3. Run the application**

Open `index.html` in your browser.

No package installation or build step is required.

## 💾 Data Storage

Taskbook uses browser `localStorage` to save task information.

- Tasks remain available after refreshing the page.
- Data is stored locally in the browser.
- Clearing browser storage will remove saved tasks.

## 🌐 Deployment

Taskbook can be deployed using:

- GitHub Pages
- Vercel
- Netlify

The application uses static files and does not require a build command.

## 👨‍💻 Author

**Abdul Rehman Yasir**

- GitHub: [AbdulRehmanYasir](https://github.com/AbdulRehmanYasir)
- Repository: [Datheon Full Stack Web Development Internship](https://github.com/AbdulRehmanYasir/Datheon_Full_Stack_Web_Development_Internship)

---

<div align="center">

**Keep Learning. Keep Building. Keep Improving.**

Made with ❤️ by Abdul Rehman Yasir

</div>
