import { WeatherData } from "../interfaces/WeatherData";

export const mapWeatherData = (data: any): WeatherData => ({
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