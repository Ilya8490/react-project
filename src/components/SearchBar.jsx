// src/components/SearchBar.js
import React, { useState } from 'react';

function SearchBar({ setCity, fetchWeather }) {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    setCity(input);
    fetchWeather(input);
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Enter city" 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;