// src/services/weatherService.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHERAPI_API_KEY;
const BASE_URL = 'http://api.weatherapi.com/v1';

export const getCurrentWeather = async (location) => {
    const response = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${location}`);
    return response.data;
};

export const getHourlyForecast = async (location) => {
    const response = await axios.get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&hours=24`);
    return response.data.forecast.forecastday[0].hour;
};

export const getFiveDayForecast = async (location) => {
    const response = await axios.get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=5`);
    return response.data.forecast.forecastday;
};


