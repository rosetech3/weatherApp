const apikey = "cf424624cb9b5e72c22752ea55d8a1f8";

const weatherDataEl = document.getElementById("weather-data");

const cityinputEl = document.getElementById("city-input");
//  const submit = document.getElementById('submit');

const formEl = document.querySelector("form")

//  event listener
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityinputEl.value;
    // console.log(cityValue);
    getWeatherData(cityValue);

})

async function getWeatherData(cityValue) {
    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)
        if (!response.ok) {
            throw new Error("network response was not ok");
        }
        const data = await response.json()
        console.log(data);

        const temperature = Math.round(data.main.temp)

        const description = data.weather[0].description

        const icon = data.weather[0].icon

        const details = [
            `feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `wind speed: ${data.wind.speed}m/s`,

        ]
        weatherDataEl.querySelector(".icon").innerHTML = `< img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataEl.querySelector(
            ".temperature"
        ).textContent = `${temperature}°C`;
        weatherDataEl.querySelector(
            ".description"
        ).textContent = description;
        weatherDataEl.querySelector(
            ".details").innerHTML = details.map((detail) =>
            ` < div >${ detail }</div>`

        ).join("");
    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(
            ".temperature"
        ).textContent = "";
        weatherDataEl.querySelector(
            ".description"
        ).textContent = "an error occur try again later";
        weatherDataEl.querySelector(
            ".details").innerHTML = "";
    }
}