function updateDay() {
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

function farenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#high-temp-day1");
  let farenheitTemp = (temperatureElement.innerHTML * 9) / 5 + 2;
  temperatureElement.innerHTML = Math.round(farenheitTemp);
}

function updateCityTemp(response) {
  let temperatureElement = document.querySelector("#high-temp-day1");
  let cityElement = document.querySelector("#h1-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  let sunriseTimestamp = response.data.sys.sunrise;
  let sunrise = new Date(sunriseTimestamp * 1000);
  let sunriseHours = sunrise.getHours();
  if (sunriseHours < 10) {
    sunriseHours = `0${sunriseHours}`;
  }
  let sunriseMinutes = "0" + sunrise.getMinutes();
  let formattedSunrise = `${sunriseHours}:${sunriseMinutes.substr(-2)}`;
  let sunsetTimestamp = response.data.sys.sunset;
  let sunset = new Date(sunsetTimestamp * 1000);
  let sunsetHours = sunset.getHours();
  if (sunsetHours < 10) {
    sunsetHours = `0${sunsetHours}`;
  }
  let sunsetMinutes = "0" + sunset.getMinutes();
  let formattedSunset = `${sunsetHours}:${sunsetMinutes.substr(-2)}`;

  let iconElement = document.querySelector("#weather-icon");

  temperatureC = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = temperatureC;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  sunriseElement.innerHTML = formattedSunrise;
  sunsetElement.innerHTML = formattedSunset;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function getCity(response) {
  response.preventDefault();
  let city = document.querySelector("#input-city");
  let units = "metric";
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

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateCityTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#input-city");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);

let locateMeBtn = document.querySelector("#locate-me-btn");
locateMeBtn.addEventListener("click", getCurrentLocation);

let celsiusClick = document.querySelector("#day1-celsius");
let farenheitClick = document.querySelector("#day1-farenheit");

farenheitClick.addEventListener("click", farenheitTemp);

let dateElement = document.querySelector("#current-time");
let currentTime = new Date();
dateElement.innerHTML = updateDay(currentTime);
search("Brighton");
