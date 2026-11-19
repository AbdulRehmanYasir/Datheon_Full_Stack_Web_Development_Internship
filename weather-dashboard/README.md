# Skyline Weather Dashboard

Search any city in the world for live conditions and a 5-day forecast.

## Features
- Current temperature, condition, feels-like, humidity, wind speed and atmospheric pressure
- 5-day forecast cards rendered with `Array.map()`
- Dynamic SVG weather icons (sun, moon, clouds, rain, snow, storm, fog)
- Background gradient changes with the weather and with day or night at the searched city
- Loading spinner, plus clear messages for unknown cities and network failures
- Remembers your last search; fully responsive

## Data source
[Open-Meteo](https://open-meteo.com) provides geocoding and weather data. It does not require an API key. To use another weather API, replace `fetchCity` and `fetchWeather` in `script.js`.

## Run
Open `index.html` in a browser (needs an internet connection).

## Deploy
Push to GitHub and enable Pages, or import into Vercel or Netlify. No build step.
