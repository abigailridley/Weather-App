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
  let todayElement = document.querySelector("#today");
  todayElement.innerHTML = currentDay;
  return ` ${currentHour}:${currentMinute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return dayIndex[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.slice(1).forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-3">
        <div class="weather-forecast-date">
          ${formatDay(forecastDay.dt)}
        </div>
        
        <img src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="40px">
            <div class="weather-forecast-temp">
             <span class="forecast-temp-high">${Math.round(
               forecastDay.temp.max
             )}°</span> 
             <span class="forecast-temp-min">${Math.round(
               forecastDay.temp.min
             )}°</span> 
            </div>
      </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function convertUTCDateToLocalDate(date) {
  var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;   
}

function sunset(timestamp, timezone) {
  let sunsetElement = document.querySelector("#sunset");
  let sunset = new Date(timestamp * 1000);

  sunsetElement.textContent = moment.utc(timestamp, 'X').add(timezone, 'seconds').format('HH:mm')
}

function sunrise(timestamp, timezone) {
  let sunriseElement = document.querySelector("#sunrise");

  sunriseElement.textContent = moment.utc(timestamp, 'X').add(timezone, 'seconds').format('HH:mm')
}

function getForecast(coordinates) {
  let apiKey = "8a104eff40d67002b71f619e6f4833ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function updateCityTemp(response) {
  let temperatureElement = document.querySelector("#high-temp-day1");
  let cityElement = document.querySelector("#h1-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let lowTemperatureElement = document.querySelector("#low-temp-day1");

  let iconElement = document.querySelector("#weather-icon");

  celsiusTemperature = response.data.main.temp;
  lowCelsiusTemperature = response.data.main.temp_min;

  lowCelsiusTemp = Math.round(response.data.main.temp_min);
  lowTemperatureElement.innerHTML = lowCelsiusTemp;
  temperatureC = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = temperatureC;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);

  sunrise(response.data.sys.sunrise, response.data.timezone);
  sunset(response.data.sys.sunset, response.data.timezone);
  getForecast(response.data.coord);
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

let celsiusTemperature = null;
let lowCelsiusTemperature = null;

let dateElement = document.querySelector("#current-time");
let currentTime = new Date();
dateElement.innerHTML = updateDay(currentTime);

search("Brighton");


