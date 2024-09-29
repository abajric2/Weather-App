import { WeatherData } from "../interfaces/WeatherData";
import { GeoData } from "../interfaces/GeoData";
import { mapWeatherData } from "../utils/weatherDataMapper";
import { mapGeoData } from "../utils/geoDataMapper";
import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const fetchGeoData = async (city: string): Promise<GeoData> => {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
        params: {
            q: city,
            limit: 1,
            appid: API_KEY
        }
    });

    if (response.data.length === 0) {
        throw new Error(`Error: City with name "${city}" not found`);
    }

    const keyGeoData = mapGeoData(response.data[0])
    console.info(`Info: Geo data received from API for "${city}": `, keyGeoData)

    return keyGeoData;
};

const fetchWeatherDataFromCoordinates = async (geoData: GeoData): Promise<WeatherData> => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
            lat: geoData.lat,
            lon: geoData.lon,
            appid: API_KEY,
            units: 'metric'
        }
    });

    return response.data;
};

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
    try {
        const geoData = await fetchGeoData(city);
        const weatherData = await fetchWeatherDataFromCoordinates(geoData);
        const keyWeatherData = mapWeatherData(weatherData)

        console.info(`Info: Weather data received from API for "${city}": `, keyWeatherData)

        return keyWeatherData;
    } catch (error) {
        console.error(`Error: Failed to fetch weather data for "${city}":`, error);
        throw error;
    }
};