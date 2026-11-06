# Developer Portfolio

Personal portfolio for Abdul Rehman Yasir: hero, about, tech stack, featured projects (with detail popups), resume and contact.

## Features
- Mobile-first layout using Flexbox and CSS Grid
- Light and dark theme toggle (remembers your choice, respects system preference)
- Smooth-scrolling navigation with a hamburger menu on small screens
- Project detail modal built on the native `<dialog>` element
- Semantic HTML5 and keyboard-friendly focus styles

## Run locally
Open `index.html` in a browser, or run `npx serve .`.

## Customise
- Project and skill content lives at the top of `script.js`.
- Add verified repository URLs to the project entries in `script.js`; source links remain hidden until a real URL is supplied.
- Add a professional email, profile links and a finalized resume PDF to `index.html` before publishing.

## Deploy (GitHub Pages)
1. Push this folder to a public GitHub repo.
2. Settings > Pages > Deploy from branch > `main` / root.
3. Your site goes live at `https://<username>.github.io/<repo>/`.

Vercel and Netlify also work: import the folder, with no build command needed.
