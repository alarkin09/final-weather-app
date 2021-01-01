alert("Greetings!");

function displayTemperature(response){
    console.log(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
}

let apiKey = "29a44231d6c7563fcc1740ef29d751ed";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=San Francisco&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);