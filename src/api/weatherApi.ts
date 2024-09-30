import { WeatherData } from "../interfaces/WeatherData";
import { GeoData } from "../interfaces/GeoData";
import { mapWeatherData } from "../utils/weatherDataMapper";
import { mapGeoData } from "../utils/geoDataMapper";
import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const GEO_API_URL = process.env.REACT_APP_GEO_API_URL || 'http://api.openweathermap.org/geo/1.0/direct';
const WEATHER_API_URL = process.env.REACT_APP_WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5/weather';

const fetchGeoData = async (city: string): Promise<GeoData | null> => {
    const response = await axios.get(GEO_API_URL, {
        params: {
            q: city,
            limit: 1,
            appid: API_KEY
        }
    });

    if (response.data.length === 0) {
        console.warn(`WARN: City with name "${city}" not found`)
        return null;
    }

    const keyGeoData = mapGeoData(response.data[0])
    console.info(`INFO: Geo data received from API for "${city}": `, keyGeoData)

    return keyGeoData;
};

const fetchWeatherDataFromCoordinates = async (geoData: GeoData): Promise<WeatherData | null> => {
    const response = await axios.get(WEATHER_API_URL, {
        params: {
            lat: geoData.lat,
            lon: geoData.lon,
            appid: API_KEY,
            units: 'metric'
        }
    });

    if (response.data.length === 0) {
        console.warn(`WARN: Weather data for "${geoData.city}" not found`);
        return null;
    }

    const keyWeatherData = mapWeatherData(response.data)
    console.info(`INFO: Weather data received from API for "${geoData.city}": `, keyWeatherData)

    return keyWeatherData;
};

export const fetchWeatherData = async (city: string): Promise<WeatherData | null> => {
    try {
        if (city && city.trim().length === 0) {
            throw new Error("ERROR: City name must not be empty");
        }

        const geoData = await fetchGeoData(city);
        if(!geoData) return null;
        const weatherData = await fetchWeatherDataFromCoordinates(geoData);

        return weatherData;
    } catch (error) {
        console.error(`ERROR: An error occured while trying to fetch weather data for "${city}":`, error);
        throw error;
    }
};