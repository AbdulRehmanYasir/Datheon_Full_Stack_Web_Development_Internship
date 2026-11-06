# Taskbook

A small task manager with full CRUD, categories, due dates, status filters and localStorage persistence.

## Features
- Create, read, update (Edit button or double-click) and delete tasks
- Categories: Work, Personal, Study, each with its own colour
- Due dates, with overdue tasks flagged
- Filter by All, Active or Completed, plus live search
- Drag-and-drop reordering
- Animated completion (check pop and strike-through) and delete transitions
- Data survives page reloads through `localStorage`

## Code layout
`script.js` keeps all state in a single `tasks` array and exposes `addTask`, `toggleTask`, `updateTask`, `deleteTask`, `saveToLocalStorage` and `loadFromLocalStorage`.

## Run
Open `index.html` in a browser. No build step.

## Deploy
Push to GitHub and enable Pages (Settings > Pages > `main` / root), or import the repo into Vercel or Netlify.
