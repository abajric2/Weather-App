export interface WeatherData {
    temperature: number;
    feelsLike: number;
    humidity: number;
    pressure: number;
    description: string;
    windSpeed: number;
    rainVolume: number | null;
    sunrise: number;
    sunset: number;
    icon: string;
}
