import React, { useState, useEffect } from 'react';
import { getHourlyForecast } from '../services/weatherService';
import { format } from 'date-fns';
import './HourlyForecast.css'; // Ensure you have the corresponding CSS file

const HourlyForecast = ({ location, unit }) => {
    const [forecast, setForecast] = useState([]);
    const [visibleHours, setVisibleHours] = useState(3);
    const [expanded, setExpanded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (location) {
            setError(null); // Reset error state before making a new request
            getHourlyForecast(location)
                .then(setForecast)
                .catch(error => error.response && error.response.status === 400 ?
                    setError("Location not found. Please try another location.") :
                    setError("Oops! Something went wrong. Please try again later.")
                );
        }
    }, [location]);

    if (error) {
        return (
            <div>
                <p>{error}</p>
            </div>
        );
    }

    const handleToggle = () => {
        if (expanded) {
            setVisibleHours(3);
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
                    {/*<p className="condition-text condition-text-hour">{hour.condition.text}</p>*/}
                    <img className="weather-icon" src={hour.condition.icon} alt={hour.condition.text} />
                </div>
            ))}
            {forecast.length > 3 && (
                <button onClick={handleToggle}>
                    {expanded ? 'Show Less' : 'Show More'}
                </button>
            )}
        </div>
    );
};

export default HourlyForecast;
