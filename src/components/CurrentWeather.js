import React, { useState, useEffect } from 'react';
import { getCurrentWeather } from '../services/weatherService';
import { FaSearch } from 'react-icons/fa'; // Importing search icon
import { Link } from 'react-router-dom';
//import axios from 'axios';
import './CurrentWeather.css';
import { format } from 'date-fns';
import ErrorMessages from '../constants/errorMessages';


const CurrentWeather = ({ location, unit, onCitySelect }) => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null); // Define error state

    useEffect(() => {
        if (location) {
            setError(null); // Reset error state before making a new request
            getCurrentWeather(location)
                .then(setWeather)
                .catch(error => error.response && error.response.status === 400 ?
                    setError(ErrorMessages.LOCATION_NOT_FOUND) :
                    setError(ErrorMessages.GENERIC_ERROR)
                );
        }
    }, [location]);

    const handleUseCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await getCurrentWeather(`${latitude},${longitude}`);
                    setWeather(response);
                    onCitySelect(response.location.name);
                } catch (error) {
                    if (error.response && error.response.status === 400) {
                        setError(ErrorMessages.LOCATION_NOT_FOUND);
                    } else {
                        setError(ErrorMessages.GENERIC_ERROR);
                    }
                }
            }, (error) => {
                console.error(ErrorMessages.ERROR_LOCATION, error);
            });
        } else {
            console.error(ErrorMessages.NO_GEOLOCATION_BROWSER_SUPPORT);
        }
    };


    if (error) {
        return (
            <div className="current-weather">
                <p>{error}</p>
                <div className="actions">
                    <Link to="/search" className="search-icon">
                        <FaSearch />
                    </Link>
                    <button onClick={handleUseCurrentLocation}>Use Current Location</button>
                </div>
            </div>
        );
    }

    if (!weather) return <p>Loading...</p>;

    const temp = unit === 'C' ? weather.current.temp_c : weather.current.temp_f;
    const windSpeed = unit === 'C' ? `${weather.current.wind_kph} km/h` : `${weather.current.wind_mph} mph`;
    const precipitation = unit === 'C' ? `${weather.current.precip_mm} mm` : `${weather.current.precip_in} in`;

    return (
        <div className="current-weather">
            <div className="actions">
                <Link to="/search" className="search-icon">
                    <FaSearch />
                </Link>
                <button onClick={handleUseCurrentLocation}>Use Current Location</button>
            </div>
            <div className="header">
                <p className="temperature">{temp}&#176;{unit}</p>
                <h2>{weather.location.name}</h2>
                <p>{format(new Date(weather.location.localtime), 'MMMM d, p')}</p>

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
