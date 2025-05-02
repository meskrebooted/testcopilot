const apiUrl = 'https://api.open-meteo.com/v1/forecast';

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
        const response = await fetch(`${apiUrl}?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`);
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        displayError('Failed to fetch weather data. Please try again.');
    }
}

function updateUI(data) {
    temperatureElement.textContent = `Temperature: ${data.current_weather.temperature}°C`;
    humidityElement.textContent = `Humidity: ${data.current_weather.humidity}%`;
    conditionsElement.textContent = `Conditions: ${data.current_weather.weathercode}`;
    errorElement.textContent = '';
}

function displayError(message) {
    errorElement.textContent = message;
    temperatureElement.textContent = '';
    humidityElement.textContent = '';
    conditionsElement.textContent = '';
}
