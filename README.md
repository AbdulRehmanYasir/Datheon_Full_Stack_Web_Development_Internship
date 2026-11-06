# Internship Projects

Four self-contained front-end projects built with semantic HTML, modern CSS and vanilla JavaScript.

| Folder | Project | External data |
|---|---|---|
| [`portfolio/`](./portfolio/) | Personal portfolio with theme switching, responsive navigation and project dialogs | None |
| [`task-manager/`](./task-manager/) | Task CRUD app with categories, due dates, filters, drag-and-drop ordering and local storage | None |
| [`weather-dashboard/`](./weather-dashboard/) | City weather search with current conditions, a five-day forecast and dynamic backgrounds | [Open-Meteo](https://open-meteo.com) |
| [`ecommerce-store/`](./ecommerce-store/) | Product catalogue with filters, persistent cart and simulated checkout | [FakeStoreAPI](https://fakestoreapi.com) |

## Run locally

Each project can be opened directly in a browser. For the most reliable local behaviour, serve the workspace over HTTP:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/<project>/` in a browser. Weather and store data require an internet connection.

## Validation

There is no build step or package manifest. JavaScript syntax can be checked with:

```powershell
node --check portfolio\script.js
node --check task-manager\script.js
node --check weather-dashboard\script.js
node --check ecommerce-store\script.js
```

See each project README for its feature details and deployment notes. Each folder can be deployed independently to GitHub Pages, Vercel or Netlify.
