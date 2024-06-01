// src/components/HourlyForecast.js
import React, { useState, useEffect } from 'react';
import { getHourlyForecast } from '../services/weatherService';
import { format } from 'date-fns';

const HourlyForecast = ({ location, unit }) => {
    const [forecast, setForecast] = useState([]);
    const [visibleHours, setVisibleHours] = useState(5);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        getHourlyForecast(location).then(setForecast);
    }, [location]);

    const handleToggle = () => {
        if (expanded) {
            setVisibleHours(5);
        } else {
            setVisibleHours(forecast.length);
        }
        setExpanded(!expanded);
    };

    return (
        <div>
            <h2>Hourly Forecast</h2>
            {forecast.slice(0, visibleHours).map((hour, index) => (
                <div key={index} className="hourly-row">
                    <p>{format(new Date(hour.time), 'p')}</p>
                    <p>{unit === 'C' ? `${hour.temp_c}\u00B0C` : `${hour.temp_f}\u00B0F`}</p>
                    <p>{hour.condition.text}</p>
                    <img className="weather-icon" src={hour.condition.icon} alt={hour.condition.text} />
                </div>
            ))}
            {forecast.length > 5 && (
                <button onClick={handleToggle}>
                    {expanded ? 'Show Less' : 'Show More'}
                </button>
            )}
        </div>
    );
};

export default HourlyForecast;
