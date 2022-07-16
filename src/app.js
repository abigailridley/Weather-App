function updateDay(date) {
  let now = new Date();
  let dayIndex = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = dayIndex[now.getDay()];

  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = now.getMinutes();

  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  return `${currentDay} ${currentHour}:${currentMinute}`;
}

function celsiusTemp() {
  let units = document.querySelectorAll("span.units");
  units.forEach((unitsElement) => {
    unitsElement.innerHTML = "°C";
  });
}

function farenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#high-temp-day1");
  let farenheitTemp = (temperatureElement.innerHTML * 9) / 5 + 2;
  temperatureElement.innerHTML = Math.round(farenheitTemp);

  let units = document.querySelectorAll("span.units");
  units.forEach((unitsElement) => {
    unitsElement.innerHTML = "°F";
  });
}

function updateCity(event) {
  event.preventDefault();
  let input = document.querySelector("#h1-city");
  let city = document.querySelector("#input-city");
  input.innerHTML = `${city.value}`;
}
function updateCityTemp(response) {
  let temperatureElement = document.querySelector("#high-temp-day1");
  temperatureC = Math.round(response.data.main.temp_max);
  temperatureElement.innerHTML = temperatureC;
}

function getCity(response) {
  response.preventDefault();
  let units = "metric";
  let city = document.querySelector("#input-city");
  let apiKey = "8a104eff40d67002b71f619e6f4833ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(updateCityTemp);
}

function showMyLocation(response) {
  let cityElement = document.querySelector("#h1-city");
  let tempElement = document.querySelector("#high-temp-day1");
  let temperatureC = Math.round(response.data.main.temp_max);
  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = temperatureC;
}

function findMe(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "8a104eff40d67002b71f619e6f4833ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showMyLocation);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findMe);
}

let locateMeBtn = document.querySelector("#locate-me-btn");
locateMeBtn.addEventListener("click", getCurrentLocation);

let celsiusClick = document.querySelector("#day1-celsius");
let farenheitClick = document.querySelector("#day1-farenheit");

celsiusClick.addEventListener("click", celsiusTemp);
farenheitClick.addEventListener("click", farenheitTemp);

let search = document.querySelector("#search-bar");
search.addEventListener("submit", getCity);
search.addEventListener("submit", updateCity);

let dateElement = document.querySelector("#current-time");
let currentTime = new Date();
dateElement.innerHTML = updateDay(currentTime);
