import axios from 'axios';

const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const searchButton = document.getElementById('searchButton');
const locationInput = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const conditionsElement = document.getElementById('conditions');
const errorElement = document.getElementById('error');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeatherData(location);
    } else {
        displayError('Please enter a location.');
    }
});

async function fetchWeatherData(location) {
    try {
        const response = await axios.get(apiUrl, {
            params: {
                q: location,
                appid: apiKey,
                units: 'metric'
            }
        });
        const data = response.data;
        updateUI(data);
    } catch (error) {
        displayError('Failed to fetch weather data. Please try again.');
    }
}

function updateUI(data) {
    temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    conditionsElement.textContent = `Conditions: ${data.weather[0].description}`;
    errorElement.textContent = '';
}

function displayError(message) {
    errorElement.textContent = message;
    temperatureElement.textContent = '';
    humidityElement.textContent = '';
    conditionsElement.textContent = '';
}
