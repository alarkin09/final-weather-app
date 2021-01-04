
function formatDate(timestamp){
let date = new Date (timestamp);
let days =[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
let day = days[date.getDay()];
return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp){
    let date = new Date (timestamp);
let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}
return `${hours}:${minutes}`;
}

function displayTemperature(response){
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = response.data.wind.speed;
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    celsiusTemperature = response.data.main.temp;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = null; 
 
  for (let index = 0; index < 6; index ++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class = "col-2">
    <h3>
  ${formatHours(forecast.dt*1000)}
   </h3>
    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
    alt=""/>
     <div class = "weather-forecast-temperature">
     <strong> ${Math.round(forecast.main.temp_max)}°/ </strong>${Math.round(forecast.main.temp_min)}°
     </div>
     </div>
   `;
 }
}
  
function searchCity(city) {
    let apiKey = "29a44231d6c7563fcc1740ef29d751ed";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function handleSubmit (event){
    event.preventDefault();
    let cityElementInput = document.querySelector("#city-input");
    searchCity(cityElementInput.value);    
}

function showFahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9)/5 + 32;
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function showCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null; 

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

searchCity("San Francisco");