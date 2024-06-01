// src/components/CurrentWeather.js
import React, { useState, useEffect } from 'react';
import { getCurrentWeather } from '../services/weatherService';
import { FaSearch } from 'react-icons/fa'; // Importing search icon
import { Link } from 'react-router-dom';
import axios from 'axios';

const CurrentWeather = ({ location, unit, onCitySelect }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (location) {
            getCurrentWeather(location).then(setWeather);
        }
    }, [location]);

    const handleUseCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                    const city = response.data.city;
                    onCitySelect(city);
                } catch (error) {
                    console.error('Error fetching current location:', error);
                }
            }, (error) => {
                console.error('Error getting current location:', error);
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    if (!weather) return <p>Loading...</p>;

    const temp = unit === 'C' ? weather.current.temp_c : weather.current.temp_f;
    const windSpeed = unit === 'C' ? `${weather.current.wind_kph} km/h` : `${weather.current.wind_mph} mph`;
    const precipitation = unit === 'C' ? `${weather.current.precip_mm} mm` : `${weather.current.precip_in} in`;

    return (
        <div className="current-weather">
            <Link to="/search" className="search-icon">
                <FaSearch />
            </Link>
            <button onClick={handleUseCurrentLocation}>Use Current Location</button>
            <div className="header">
                <p className="temperature">{temp}&#176;{unit}</p>
                <h2>{weather.location.name}</h2>
                <p>{weather.location.localtime}</p>
            </div>
            <div className="icon">
                <img className="weather-icon" src={weather.current.condition.icon} alt={weather.current.condition.text} />
            </div>
            <div className="details">
                <p>Condition: {weather.current.condition.text}</p>
                <p>Wind Speed: {windSpeed}</p>
                <p>Humidity: {weather.current.humidity}%</p>
                <p>Precipitation: {precipitation}</p>
            </div>
        </div>
    );
};

export default CurrentWeather;

