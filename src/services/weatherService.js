import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHERAPI_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export const getCurrentWeather = async (location) => {
    try {
        const response = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${location}`);
        return response.data;
    } catch (error) {
        throw error; // Propagate the error to the caller
    }
};

export const getHourlyForecast = async (location) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&hours=12`);
        return response.data.forecast.forecastday[0].hour;
    } catch (error) {
        throw error; // Propagate the error to the caller
    }
};

export const getFiveDayForecast = async (location) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=5`);
        return response.data.forecast.forecastday;
    } catch (error) {
        throw error; // Propagate the error to the caller
    }
};
