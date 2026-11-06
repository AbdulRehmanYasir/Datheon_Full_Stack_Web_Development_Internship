// Weather data comes from Open-Meteo (free, no API key needed).
const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

const $ = (s) => document.querySelector(s);
const form = $("#search-form");
const input = $("#city-input");
const searchButton = $("#search-button");
let searchVersion = 0;

// ---- weather code lookup (WMO codes used by Open-Meteo) ----
function describe(code, isDay) {
  if (code === 0) return isDay ? { label: "Sunny", icon: "sun", mood: "clear-day" } : { label: "Clear night", icon: "moon", mood: "clear-night" };
  if (code <= 2) return { label: "Partly cloudy", icon: isDay ? "partly" : "partlyNight", mood: isDay ? "clear-day" : "clear-night" };
  if (code === 3) return { label: "Overcast", icon: "cloud", mood: "cloudy" };
  if (code <= 48) return { label: "Foggy", icon: "fog", mood: "fog" };
  if (code <= 57) return { label: "Drizzle", icon: "rain", mood: "rain" };
  if (code <= 67) return { label: "Rainy", icon: "rain", mood: "rain" };
  if (code <= 77) return { label: "Snow", icon: "snow", mood: "snow" };
  if (code <= 82) return { label: "Rain showers", icon: "rain", mood: "rain" };
  if (code <= 86) return { label: "Snow showers", icon: "snow", mood: "snow" };
  return { label: "Thunderstorm", icon: "storm", mood: "storm" };
}

// ---- inline SVG icons ----
const cloud = `<path d="M18 46a10 10 0 0 1 1-20 14 14 0 0 1 27 4 8 8 0 0 1-1 16z" fill="#eef3f8"/>`;
const sunShape = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffc940"/><g stroke="#ffc940" stroke-width="3" stroke-linecap="round" transform="translate(${x - 32} ${y - 32})"><path d="M32 8v6M32 50v6M8 32h6M50 32h6M15 15l4 4M45 45l4 4M15 49l4-4M45 19l4-4"/></g>`;
const moonShape = `<path d="M40 14a16 16 0 1 0 12 26A19 19 0 0 1 40 14z" fill="#f1e9c6"/>`;
const ICONS = {
  sun: sunShape(32, 32, 11),
  moon: `<g transform="translate(-4 2)">${moonShape}</g>`,
  cloud,
  partly: sunShape(24, 24, 9) + `<g transform="translate(4 6)">${cloud}</g>`,
  partlyNight: `<g transform="scale(.8) translate(-2 -2)">${moonShape}</g><g transform="translate(4 6)">${cloud}</g>`,
  rain: cloud + `<path d="M22 50l-3 7M32 50l-3 7M42 50l-3 7" stroke="#5aa9ff" stroke-width="3" stroke-linecap="round"/>`,
  snow: cloud + `<g fill="#fff"><circle cx="22" cy="53" r="2.5"/><circle cx="32" cy="56" r="2.5"/><circle cx="42" cy="53" r="2.5"/></g>`,
  storm: cloud + `<path d="M34 42l-8 11h7l-3 9 11-13h-7z" fill="#ffc940"/>`,
  fog: cloud + `<path d="M16 52h32M20 58h24" stroke="#d6dde3" stroke-width="3" stroke-linecap="round"/>`
};
const svg = (name) => `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">${ICONS[name]}</svg>`;

// ---- network ----
async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

async function fetchCity(name) {
  const data = await getJSON(`${GEO_URL}?name=${encodeURIComponent(name)}&count=1&language=en&format=json`);
  if (!data.results?.length) {
    const err = new Error(`We couldn't find a city called "${name}". Check the spelling and try again.`);
    err.notFound = true;
    throw err;
  }
  return data.results[0];
}

async function fetchWeather({ latitude, longitude }) {
  const params = new URLSearchParams({
    latitude, longitude, timezone: "auto", forecast_days: 5,
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,pressure_msl,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min"
  });
  return getJSON(`${WEATHER_URL}?${params}`);
}

// ---- UI ----
function setState({ loading = false, error = "", show = false }) {
  $("#loader").hidden = !loading;
  $("#error").hidden = !error;
  $("#error").textContent = error;
  $("#weather").hidden = !show;
  searchButton.disabled = loading;
  input.disabled = loading;
}

function renderWeather(place, w) {
  const c = w.current;
  const info = describe(c.weather_code, c.is_day === 1);

  document.body.dataset.mood = info.mood;
  $("#city").textContent = [place.name, place.admin1, place.country].filter(Boolean).join(", ");
  $("#local-time").textContent = `Local time ${c.time.replace("T", " ")}${w.timezone_abbreviation ? ` (${w.timezone_abbreviation})` : ""}`;
  $("#temp").textContent = Math.round(c.temperature_2m);
  $("#condition").textContent = info.label;
  $("#main-icon").innerHTML = svg(info.icon);
  $("#feels").textContent = Math.round(c.apparent_temperature) + "\u00B0C";
  $("#humidity").textContent = c.relative_humidity_2m + "%";
  $("#wind").textContent = Math.round(c.wind_speed_10m) + " km/h";
  $("#pressure").textContent = Math.round(c.pressure_msl) + " hPa";

  const d = w.daily;
  $("#forecast").innerHTML = d.time.map((date, i) => {
    const day = describe(d.weather_code[i], true);
    const name = i === 0 ? "Today" : new Date(date + "T00:00").toLocaleDateString(undefined, { weekday: "short" });
    return `<li class="day">
      <span class="name">${name}</span>${svg(day.icon)}
      <span class="hi">${Math.round(d.temperature_2m_max[i])}&deg;</span>
      <span class="lo">${Math.round(d.temperature_2m_min[i])}&deg;</span>
    </li>`;
  }).join("");
}

async function search(name) {
  const version = ++searchVersion;
  setState({ loading: true });
  try {
    const place = await fetchCity(name);
    const weather = await fetchWeather(place);
    if (version !== searchVersion) return;
    renderWeather(place, weather);
    setState({ show: true });
    try { localStorage.setItem("skyline.lastCity", name); } catch { /* ignore */ }
  } catch (err) {
    if (version !== searchVersion) return;
    const offline = err instanceof TypeError;
    setState({ error: err.notFound ? err.message : offline
      ? "Can't reach the weather service. Check your internet connection and try again."
      : "Something went wrong while loading the weather. Please try again in a moment." });
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = input.value.trim();
  if (name) search(name);
});

let last = "Lahore";
try { last = localStorage.getItem("skyline.lastCity") || last; } catch { /* ignore */ }
input.value = last;
search(last);
