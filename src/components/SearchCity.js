// src/components/SearchCity.js
import React, { useState } from 'react';
import axios from 'axios';
import './SearchCity.css'; // Ensure you have the corresponding CSS file


const USERNAME = process.env.REACT_APP_GEONAMES_API_USERNAME;
const BASE_URL = 'http://secure.geonames.org';

const SearchCity = ({ onCitySelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleSearchChange = async (query) => {
        setSearchQuery(query);
        // Fetch city suggestions from the GeoNames API
        try {
            const response = await axios.get(`${BASE_URL}/searchJSON?q=${query}&maxRows=5&username=${USERNAME}`);
            const cities = response.data.geonames.map((city) => city.name);
            setSuggestions(cities);
        } catch (error) {
            console.error('Error fetching city suggestions:', error);
        }
    };

    return (
        <div className="search-city">
            <input
                type="text"
                placeholder="Search for a city"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
            />
            <div className="suggestions-list">
                {suggestions.map((city) => (
                    <div key={city} className="suggestion-item" onClick={() => onCitySelect(city)}>
                        {city}
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default SearchCity;
