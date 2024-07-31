// src/components/WeatherDisplay.js
import React from 'react';

function WeatherDisplay({ weatherData }) {
  return (
    <div className="weather-display">
      <h2>{weatherData.name}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      <p>Weather: {weatherData.weather[0].description}</p>
    </div>
  );
}

export default WeatherDisplay;