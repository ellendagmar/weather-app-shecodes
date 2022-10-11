let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}
let year = now.getFullYear();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "jan",
  "feb",
  "mars",
  "apr",
  "may",
  "june",
  "juli",
  "aug",
  "sept",
  "okt",
  "nov",
  "des",
];
let month = months[now.getMonth()];
let dateTime = document.querySelector("#dateTime");
dateTime.innerHTML = `${date} ${month} ${year} ${day} ${hours}:${min} `;
let searchingCity = document.querySelector("#form-search");
searchingCity.addEventListener("submit", changeCity);
let celsiusDegrees = document.querySelector("#tempTodayCelsius");
celsiusDegrees.addEventListener("click", changeToCelsius);
let celcius = null;
let fahrenheitDegrees = document.querySelector("#tempTodayFahrenheit");
fahrenheitDegrees.addEventListener("click", changeToFahrenheit);

//-----Functions

function defaultCity(city) {
  let apiKey = "f54b5b6157bb414bf46f982e5f6f106f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(`${apiUrl}`).then(showTemperature);
}
function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#form-search-input").value;
  defaultCity(city);
}
function showTemperature(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#tempToday").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${response.data.wind.speed} m/s`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].description} today!`;
  console.log(response.data.weather[0].icon);
  let iconImage = document.querySelector("#mainImage");
  iconImage.setAttribute("src", `images/${response.data.weather[0].icon}.png`);
  celcius = Math.round(response.data.main.temp);
  fahrenheitDegrees.classList.remove("active");
  celsiusDegrees.classList.add("active");
  getForecast(response.data.coord);
}
function changeToCelsius(event) {
  event.preventDefault();
  fahrenheitDegrees.classList.remove("active");
  celsiusDegrees.classList.add("active");
  let tempToday = document.querySelector("#tempToday");
  tempToday.innerHTML = Math.round(celcius);
}
function changeToFahrenheit(event) {
  event.preventDefault();
  celsiusDegrees.classList.remove("active");
  fahrenheitDegrees.classList.add("active");
  let tempToday = document.querySelector("#tempToday");
  let fahrenTempToday = celcius * 1.8 + 32;
  tempToday.innerHTML = Math.round(fahrenTempToday);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&cnt=100&appid=f54b5b6157bb414bf46f982e5f6f106f&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  forecastHTML += `<div class="col firstday">
            <div class="row">
              <img src="images/${
                forecast.list[8].weather[0].icon
              }.png" alt="sunny" />
            </div>
            <div class="row">
              <p class="weekdayname">${formatDay(forecast.list[8].dt)}</p>
            </div>
            <div class="row">
              <span class="daysForecast">${Math.round(
                forecast.list[8].main.temp
              )}°</span>
            </div>
          </div>
          <div class="col secday">
            <div class="row">
              <img src="images/${
                forecast.list[16].weather[0].icon
              }.png" alt="half cloudy" />
            </div>
            <div class="row">
              <p class="weekdayname">${formatDay(forecast.list[16].dt)}</p>
            </div>
            <div class="row">
              <span class="daysForecast">${Math.round(
                forecast.list[16].main.temp
              )}°</span>
            </div>
          </div>
          <div class="col thirdday">
            <div class="row">
              <img src="images/${
                forecast.list[24].weather[0].icon
              }.png" alt="sunny" />
            </div>
            <div class="row">
              <p class="weekdayname">${formatDay(forecast.list[24].dt)}</p>
            </div>
            <div class="row">
              <span class="daysForecast">${Math.round(
                forecast.list[24].main.temp
              )}°</span>
            </div>
          </div>
          <div class="col fourthday">
            <div class="row">
              <img src="images/${
                forecast.list[32].weather[0].icon
              }.png" alt="cloudy" />
            </div>
            <div class="row">
              <p class="weekdayname">${formatDay(forecast.list[32].dt)}</p>
            </div>
            <div class="row">
              <span class="daysForecast">${Math.round(
                forecast.list[32].main.temp
              )}°</span>
            </div>
          </div>
          </div>`;

  forecastElement.innerHTML = forecastHTML;
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "f54b5b6157bb414bf46f982e5f6f106f";
  let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl1}`).then(showTemperature);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  console.log(apiUrl1);
}

defaultCity("New York");
