 <div align="center">

# 🌤️ SKYLINE

### Weather Dashboard

A responsive weather dashboard for searching cities worldwide and viewing current conditions alongside a 5-day forecast.

**Search. Explore. Stay Updated.**

</div>

---

## 📌 About

Skyline is a weather dashboard built with HTML, CSS, and vanilla JavaScript. It uses Open-Meteo to retrieve location and weather information without requiring an API key.

Users can search for cities, check current weather conditions, and view upcoming forecasts through a responsive interface.

## ✨ Features

- **City Search:** Search for cities around the world.
- **Current Conditions:** Displays temperature, weather condition, feels-like temperature, humidity, wind speed, and atmospheric pressure.
- **5-Day Forecast:** Renders daily forecast cards using JavaScript `Array.map()`.
- **Weather Icons:** Dynamic SVG icons for sunny, cloudy, rainy, snowy, stormy, foggy, and night conditions.
- **Dynamic Backgrounds:** Changes the background gradient based on weather conditions and local day/night time.
- **Loading Indicator:** Displays a spinner while fetching weather data.
- **Error Handling:** Provides messages for unknown cities and network failures.
- **Search Persistence:** Remembers the last searched city.
- **Responsive Design:** Adapts to different screen sizes.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling, gradients, and responsive layout |
| JavaScript | Search, data handling, and UI updates |
| SVG | Weather icons |
| Open-Meteo API | Geocoding and weather data |
| localStorage | Last search persistence |

## 🌐 Data Source

**[Open-Meteo](https://open-meteo.com)** provides the weather and geocoding data.

- No API key required.
- Provides city search and weather information.
- Requires an active internet connection.

To use another weather provider, replace `fetchCity()` and `fetchWeather()` in `script.js` and update the response handling as needed.

## 📁 Repository Structure

```text id="skyl1n"
weather-dashboard/
│
├── index.html
├── style.css
├── script.js
├── favicon.svg
└── README.md
```

## 🚀 Getting Started

**1. Clone the repository**

```bash id="s7k2p1"
git clone https://github.com/AbdulRehmanYasir/Datheon_Full_Stack_Web_Development_Internship.git
```

**2. Open the weather dashboard folder**

```bash id="w3m8q5"
cd Datheon_Full_Stack_Web_Development_Internship/weather-dashboard
```

**3. Run the application**

Open `index.html` in your browser.

No package installation or build step is required.

> An active internet connection is required to retrieve weather information.

## 🌐 Deployment

Skyline can be deployed using:

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
