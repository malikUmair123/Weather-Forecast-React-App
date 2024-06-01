// src/components/FiveDayForecast.js
import React, { useState, useEffect } from 'react';
import { getFiveDayForecast } from '../services/weatherService';
import { format } from 'date-fns';

const FiveDayForecast = ({ location, unit }) => {
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        getFiveDayForecast(location).then(setForecast);
    }, [location]);

    return (
        <div>
            <h2>5-Day Forecast</h2>
            {forecast.map((day, index) => (
                <div key={index} className="daily-row">
                    <p>{format(new Date(day.date), 'MMMM d, yyyy')}</p>
                    <p>High: {unit === 'C' ? `${day.day.maxtemp_c}\u00B0C` : `${day.day.maxtemp_f}\u00B0F`}</p>
                    <p>Low: {unit === 'C' ? `${day.day.mintemp_c}\u00B0C` : `${day.day.mintemp_f}\u00B0F`}</p>
                    <p>{day.day.condition.text}</p>
                    <img className="weather-icon" src={day.day.condition.icon} alt={day.day.condition.text} />
                </div>
            ))}
        </div>
    );
};

export default FiveDayForecast;
