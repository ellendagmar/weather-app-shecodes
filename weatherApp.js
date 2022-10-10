//---------- Inserting time and date
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

//---------- Searching and h1 element
function defaultCity(city) {
  let apiKey = "f54b5b6157bb414bf46f982e5f6f106f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(`${apiUrl}`).then(showTemperature);
}

let searchingCity = document.querySelector("#form-search");
searchingCity.addEventListener("submit", changeCity);

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
}

//---------- Temperature Celsius and Fahrenheit
let celsiusDegrees = document.querySelector("#tempTodayCelsius");
celsiusDegrees.addEventListener("click", changeToCelsius);
function changeToCelsius(event) {
  event.preventDefault();
  fahrenheitDegrees.classList.remove("active");
  celsiusDegrees.classList.add("active");
  let tempToday = document.querySelector("#tempToday");
  tempToday.innerHTML = Math.round(celcius);
}

let fahrenheitDegrees = document.querySelector("#tempTodayFahrenheit");
fahrenheitDegrees.addEventListener("click", changeToFahrenheit);
function changeToFahrenheit(event) {
  event.preventDefault();
  celsiusDegrees.classList.remove("active");
  fahrenheitDegrees.classList.add("active");
  let tempToday = document.querySelector("#tempToday");
  let fahrenTempToday = celcius * 1.8 + 32;
  tempToday.innerHTML = Math.round(fahrenTempToday);
}
let celcius = null;

//------ Button function
let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

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
