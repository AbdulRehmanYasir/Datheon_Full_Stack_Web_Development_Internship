 <div align="center">

# 🛒 STOCKROOM

### E-commerce Storefront

A responsive online storefront built with HTML, CSS, and JavaScript, using FakeStoreAPI to fetch product data.

**Browse. Add to Cart. Checkout.**

</div>

---

## 📌 About

Stockroom is a frontend e-commerce application that lets users browse products, explore categories, search the catalogue, and manage a shopping cart.

It uses FakeStoreAPI for product data and localStorage to retain cart items between visits.

## ✨ Features

- **Product Catalogue:** Fetches products from FakeStoreAPI with loading skeletons and retry handling.
- **Product Cards:** Displays images, prices, ratings, review counts, and product badges.
- **Category Filters:** Browse Electronics, Jewelry, and Clothing.
- **Product Search:** Find products by name.
- **Shopping Cart:** Slide-out cart drawer with a live item counter.
- **Quantity Controls:** Increase, decrease, and remove cart items.
- **Price Calculation:** Subtotal, 8% tax, and $5.99 shipping, with free shipping on orders over $100.
- **Cart Persistence:** Saves cart data in localStorage.
- **Checkout:** Simulated checkout modal with order confirmation.
- **Responsive Layout:** CSS Grid layout for different screen sizes.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Application logic and interactions |
| FakeStoreAPI | Product data |
| localStorage | Cart persistence |

## ⚙️ Cart Functions

The main cart operations are defined in `script.js`:

| Function | Description |
|---|---|
| `addToCart()` | Adds a product to the cart |
| `removeFromCart()` | Removes a product |
| `updateQuantity()` | Changes item quantity |
| `calculateTotal()` | Calculates subtotal, tax, and shipping |

## 📁 Repository Structure

```text
ecommerce-store/
│
├── index.html
├── style.css
├── script.js
├── favicon.svg
└── README.md
```

## 🚀 Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/AbdulRehmanYasir/Datheon_Full_Stack_Web_Development_Internship.git
```

**2. Open the project folder**

```bash
cd Datheon_Full_Stack_Web_Development_Internship/ecommerce-store
```

**3. Run the application**

Open `index.html` in your browser.

No package installation or build step is required.

> An active internet connection is required to fetch product data from FakeStoreAPI.

## 🌐 Deployment

Stockroom can be deployed using:

- GitHub Pages
- Vercel
- Netlify

The project uses static files and does not require a build command.

## 👨‍💻 Author

**Abdul Rehman Yasir**

- GitHub: [AbdulRehmanYasir](https://github.com/AbdulRehmanYasir)
- Repository: [Datheon Full Stack Web Development Internship](https://github.com/AbdulRehmanYasir/Datheon_Full_Stack_Web_Development_Internship)

---

<div align="center">

**Keep Learning. Keep Building. Keep Improving.**

Made with ❤️ by Abdul Rehman Yasir

</div>
