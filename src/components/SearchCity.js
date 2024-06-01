// src/components/SearchCity.js
import React, { useState } from 'react';
import axios from 'axios';

const USERNAME = process.env.REACT_APP_GEONAMES_API_USERNAME;
const BASE_URL = 'http://api.geonames.org';

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
        <div>
            <input
                type="text"
                placeholder="Search for a city"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
            />
            <ul>
                {suggestions.map((city) => (
                    <li key={city} onClick={() => onCitySelect(city)}>
                        {city}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchCity;
