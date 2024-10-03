import { WeatherData } from "../WeatherData";

export interface WeatherInfoProps {
    weatherData: WeatherData,
    city: string,
    addToFavorites: (city: string) => void,
    favoriteCities: string[],
}