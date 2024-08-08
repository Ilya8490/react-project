// src/App.jsx
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');

  const fetchWeather = async (city) => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    if (!API_KEY) {
      console.error('API key is missing');
      return;
    }

    try {
      console.log(`Fetching weather data for ${city}`);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      if (response.ok) {
        console.log('Weather data:', data);
        setWeatherData(data);
      } else {
        console.error('Error fetching weather data:', data);
        setWeatherData(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  };

  return (
    <div className="App">
      <SearchBar setCity={setCity} fetchWeather={fetchWeather} />
      {weatherData && <WeatherDisplay weatherData={weatherData} />}
    </div>
  );
}

export default App;