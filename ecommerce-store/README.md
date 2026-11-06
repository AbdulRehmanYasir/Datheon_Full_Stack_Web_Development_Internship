# Stockroom: E-commerce Storefront

A small online store built with vanilla JavaScript and the [FakeStoreAPI](https://fakestoreapi.com/products).

## Features
- Product catalogue fetched live, with loading skeletons and a retry on failure
- Product cards with star ratings, review counts, prices and badges (Top rated, Popular, Great deal)
- Category filters (Electronics, Jewelry, Clothing) and product search
- Slide-out cart drawer with a live badge counter in the navbar
- Quantity increment/decrement, remove, and subtotal, 8% tax and shipping ($5.99, free over $100)
- Cart persists in `localStorage`
- Simulated checkout modal with order confirmation
- Responsive CSS Grid layout

## Cart functions
`addToCart()`, `removeFromCart()`, `updateQuantity()` and `calculateTotal()` live in `script.js`.

## Run
Open `index.html` in a browser (needs an internet connection for the API).

## Deploy
Push to GitHub and enable Pages, or import into Vercel or Netlify. No build step.
