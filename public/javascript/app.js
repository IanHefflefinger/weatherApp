var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const city = document.querySelector('.city');
const country = document.querySelector('.country');
const coordinates = document.querySelector('.coordinates');
const description = document.querySelector('.description');
const temperature = document.querySelector('.temperature');
const minTemp = document.querySelector('.minTemp');
const maxTemp = document.querySelector('.maxTemp');
const humidity = document.querySelector('.humidity');
const date = document.querySelector('.date');
const longitude = document.querySelector('.longitude');
const latitude = document.querySelector('.latitude');

const dateObj = new Date().toString().split(" ");
const month = dateObj[1];
const day = dateObj[2];
date.textContent = month + " " + day;

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    city.textContent = "loading...";
    country.textContent = "loading...";
    coordinates.textContent = "loading...";
    description.textContent = "loading...";
    temperature.textContent = "loading...";
    minTemp.textContent = "loading...";
    maxTemp.textContent = "loading...";
    humidity.textContent = "loading...";
    longitude.textContent = "loading...";
    latitude.textContent = "loading...";

    const locationApi = fetchWeather + "?location=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if (data.error) {
                city.textContent = data.error;
                country.textContent = data.error;
                coordinates.textContent = data.error;
                description.textContent = data.error;
                temperature.textContent = data.error;
                minTemp.textContent = data.error;
                maxTemp.textContent = data.error;
                humidity.textContent = data.error;
                longitude.textContent = data.error;
                latitude.textContent = data.error;
            } else {
                city.textContent = data.city;
                country.textContent = data.country;
                coordinates.textContent = data.coordinates;
                description.textContent = data.description;
                temperature.textContent = Math.round((data.temperature - 273.15) * 9/5 + 32) + String.fromCharCode(176);
                minTemp.textContent = Math.round((data.minTemp - 273.15) * 9/5 + 32) + String.fromCharCode(176);
                maxTemp.textContent = Math.round((data.maxTemp - 273.15) * 9/5 + 32) + String.fromCharCode(176);
                humidity.textContent = data.humidity + String.fromCharCode(37);
                longitude.textContent = data.longitude;
                latitude.textContent = data.latitude;
            }
        });
    });
});