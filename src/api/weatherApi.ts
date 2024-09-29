import { WeatherData } from "../interfaces/WeatherData";
import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const fetchGeoData = async (city: string) => {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
        params: {
            q: city,
            limit: 1,
            appid: API_KEY
        }
    });
    return response.data;
};

const fetchWeatherDataFromCoordinates = async (lat: number, lon: number) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric'
        }
    });
    return response.data;
};

const mapWeatherData = (data: any): WeatherData => ({
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    description: data.weather[0].description,
    windSpeed: data.wind.speed,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    icon: data.weather[0].icon,
    visibility: data.visibility,
    windDirection: data.wind.deg,
    cloudiness: data.clouds.all,
});

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
    try {
        const geoData = await fetchGeoData(city);
        if (geoData.length === 0) {
            throw new Error(`Error: City with name "${city}" not found`);
        }
        const { lat, lon } = geoData[0];
        
        const weatherData = await fetchWeatherDataFromCoordinates(lat, lon);
        const keyWeatherData = mapWeatherData(weatherData)
        console.info(`Info: Weather data received from API for "${city}": `, keyWeatherData)

        return keyWeatherData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};