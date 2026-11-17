# Datheon Full Stack Web Development Internship

Four browser-based projects completed for the Datheon Full Stack Web Development Internship. The projects use semantic HTML, responsive CSS, and vanilla JavaScript; they do not require a build step.

## Repository structure

```text
ecommerce-store/
portfolio/
task-manager/
weather-dashboard/
README.md
```

Each project is self-contained with an `index.html`, `style.css`, `script.js`, favicon, and project README.

## Projects

### Ecommerce Store — Stockroom

**Technologies:** HTML5, CSS3, vanilla JavaScript, FakeStoreAPI, localStorage.

**Features:** Live product catalogue, search, category filters, ratings, persistent cart, quantity controls, subtotal/tax/shipping calculation, and simulated checkout confirmation. The product API requires an internet connection.

**Status:** Functionally verified. The browser smoke test loaded 20 products, added an item to the cart, and calculated the displayed totals.

### Portfolio

**Technologies:** HTML5, CSS3, vanilla JavaScript, native `<dialog>`, localStorage.

**Features:** Responsive portfolio sections, mobile navigation, light/dark theme persistence, project details modal, verified project/source links, and accessible focus styling.

**Status:** Functionally verified. Theme switching, mobile navigation, and the project details modal were tested. A downloadable resume PDF and public email are intentionally not included.

### Task Manager — Taskbook

**Technologies:** HTML5, CSS3, vanilla JavaScript, localStorage, native drag-and-drop.

**Features:** Task creation, categories, due dates, overdue labels, active/completed filters, search, edit/delete, completion, drag-and-drop ordering, clear-completed, and persistence across reloads.

**Status:** Functionally verified. Task creation, category selection, completion, count updates, and localStorage persistence were tested.

### Weather Dashboard — Skyline

**Technologies:** HTML5, CSS3, vanilla JavaScript, Open-Meteo geocoding and forecast APIs.

**Features:** City search, current conditions, local time, five-day forecast, dynamic SVG weather icons, weather-based backgrounds, last-city persistence, loading state, and unknown-city/network error messages. No API key is required.

**Status:** Functionally verified. Lahore conditions and five forecast days loaded successfully, and an unknown-city search displayed the expected error.

## Run locally

No dependencies or package installation are required. Open any project's `index.html` in a modern browser:

```text
ecommerce-store/index.html
portfolio/index.html
task-manager/index.html
weather-dashboard/index.html
```

For deployment, publish the repository or an individual project with GitHub Pages, Netlify, or Vercel. The API-backed projects need outbound internet access.

## Verification

The final audit checked:

- All four projects load from their entry pages.
- Primary interactive flows and localStorage persistence.
- Responsive layouts at a 390px mobile viewport.
- Unknown-city handling in the weather dashboard.
- Public repository, project source links, and the Astra Vindex demo link.
- Static references to local CSS, JavaScript, and favicon assets.

There are no package manifests, build scripts, or automated test suites in this repository. Validation was therefore performed with browser smoke tests and static inspection. The public repository is available at [github.com/AbdulRehmanYasir/Datheon_Full_Stack_Web_Development_Internship](https://github.com/AbdulRehmanYasir/Datheon_Full_Stack_Web_Development_Internship).

## Internship

- **Organization:** Datheon
- **Program:** Full Stack Web Development Internship
- **Projects submitted:** 4
- **Author:** Abdul Rehman Yasir
