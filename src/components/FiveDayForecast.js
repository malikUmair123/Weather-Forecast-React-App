import React, { useState, useEffect } from 'react';
import { getFiveDayForecast } from '../services/weatherService';
import { format } from 'date-fns';
import './FiveDayForecast.css'; // Import the CSS file for styling
import ErrorMessages from '../constants/errorMessages';

const FiveDayForecast = ({ location, unit }) => {
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (location) {
            setError(null); // Reset error state before making a new request
            getFiveDayForecast(location)
                .then(setForecast)
                .catch(error => error.response && error.response.status === 400 ?
                    setError(ErrorMessages.LOCATION_NOT_FOUND) :
                    setError(ErrorMessages.GENERIC_ERROR)
                );
        }
    }, [location]);

    if (error) {
        return;
    }

    return (
        <div>
            <h2>5-Day Forecast</h2>
            {forecast.map((day, index) => (
                <div key={index} className="daily-row">
                    <p>{format(new Date(day.date), 'MMMM d')}</p>
                    <div className="temperature-details">
                        <p>High: {unit === 'C' ? `${day.day.maxtemp_c}\u00B0C` : `${day.day.maxtemp_f}\u00B0F`}</p>
                        <p>Low: {unit === 'C' ? `${day.day.mintemp_c}\u00B0C` : `${day.day.mintemp_f}\u00B0F`}</p>
                    </div>
                    <p className="condition-text condition-text-day">{day.day.condition.text}</p>
                    <img className="weather-icon" src={day.day.condition.icon} alt={day.day.condition.text} />
                </div>
            ))}
        </div>
    );
};

export default FiveDayForecast;
