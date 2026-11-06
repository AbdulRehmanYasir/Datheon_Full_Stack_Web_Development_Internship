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
[Open-Meteo](https://open-meteo.com) for geocoding and weather. It needs no API key, so the app works straight after deploying. To use OpenWeatherMap or WeatherAPI instead, replace `fetchCity` and `fetchWeather` in `script.js` and map the response in `renderWeather`.

## Run
Open `index.html` in a browser (needs an internet connection).

## Deploy
Push to GitHub and enable Pages, or import into Vercel or Netlify. No build step.
