// src/components/SearchBar.jsx
import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ setCity, fetchWeather }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInput(value);
    setCity(value);
    if (value.length > 2) {
      const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
      if (!API_KEY) {
        console.error('API key is missing');
        return;
      }

      try {
        console.log(`Fetching city suggestions for ${value}`);
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${value}&type=like&sort=population&cnt=5&appid=${API_KEY}`);
        console.log('City suggestions:', response.data);
        setSuggestions(response.data.list);
      } catch (error) {
        console.error('Error fetching city suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (cityName) => {
    setInput(cityName);
    setCity(cityName);
    setSuggestions([]);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter city"
        id="city-input" // Added id for accessibility
      />
      <button onClick={() => handleSelect(input)}>Search</button>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={() => handleSelect(suggestion.name)}>
              {suggestion.name}, {suggestion.sys.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;