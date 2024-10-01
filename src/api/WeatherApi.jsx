

import axios from 'axios';

const API_KEY = import.meta.env.REACT_APP_WEATHER_API_KEY;

const getWeatherData = async (location) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching the weather data", error);
    return null;
  }
};

export { getWeatherData };
