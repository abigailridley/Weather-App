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

// function celsiusTemp(event) {
//   event.preventDefault();
//   let units = document.querySelectorAll("span.units");
//   units.forEach((unitsElement) => {
//     unitsElement.innerHTML = "°C";
//   });
// }

function farenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#high-temp-day1");
  let farenheitTemp = (temperatureElement.innerHTML * 9) / 5 + 2;
  temperatureElement.innerHTML = Math.round(farenheitTemp);
}

//   let units = document.querySelectorAll("span.units");
//   units.forEach((unitsElement) => {
//     unitsElement.innerHTML = "°F";
//   });
// }

function updateCityTemp(response) {
  let temperatureElement = document.querySelector("#high-temp-day1");
  let cityElement = document.querySelector("#h1-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  temperatureC = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = temperatureC;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

function getCity(response) {
  response.preventDefault();
  let units = "metric";
  let city = document.querySelector("#input-city");
  let apiKey = "8a104eff40d67002b71f619e6f4833ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(updateCityTemp);
}

function findMe(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "8a104eff40d67002b71f619e6f4833ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateCityTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findMe);
}

let locateMeBtn = document.querySelector("#locate-me-btn");
locateMeBtn.addEventListener("click", getCurrentLocation);

let celsiusClick = document.querySelector("#day1-celsius");
let farenheitClick = document.querySelector("#day1-farenheit");

// celsiusClick.addEventListener("click", celsiusTemp);
farenheitClick.addEventListener("click", farenheitTemp);

let search = document.querySelector("#search-bar");
search.addEventListener("submit", getCity);

let dateElement = document.querySelector("#current-time");
let currentTime = new Date();
dateElement.innerHTML = updateDay(currentTime);
