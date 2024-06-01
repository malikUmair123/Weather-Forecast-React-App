// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import FiveDayForecast from './components/FiveDayForecast';
import SearchCity from './components/SearchCity';
import UnitToggle from './components/UnitToggle';
import './App.css';

const Home = ({ unit, toggleUnit, userLocation, onCitySelect }) => (
    <>
        <div className="main-content">
            <CurrentWeather location={userLocation} unit={unit} onCitySelect={onCitySelect} />
        </div>
        <div className="sidebar">
            <UnitToggle unit={unit} toggleUnit={toggleUnit} />
            <HourlyForecast location={userLocation} unit={unit} />
            <FiveDayForecast location={userLocation} unit={unit} />
        </div>
    </>
);

const App = () => {
    const [unit, setUnit] = useState('C');
    const [userLocation, setUserLocation] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user's location based on IP address
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                const { city, country } = data;
                setUserLocation(`${city}, ${country}`);
            })
            .catch(error => {
                console.error('Error fetching user location:', error);
            });
    }, []);

    const toggleUnit = () => {
        setUnit(unit === 'C' ? 'F' : 'C');
    };

    const handleCitySelect = (city) => {
        setUserLocation(city);
        navigate('/');
    };

    return (
        <div>
            <nav>
                <Link to="/">Umair's Weather App</Link>
            </nav>
            <div className="container">
                <Routes>
                    <Route
                        path="/"
                        element={<Home unit={unit} toggleUnit={toggleUnit} userLocation={userLocation} onCitySelect={handleCitySelect} />}
                    />
                    <Route path="/search" element={<SearchCity onCitySelect={handleCitySelect} />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;

