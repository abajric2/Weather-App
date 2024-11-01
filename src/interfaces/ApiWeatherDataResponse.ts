export interface ApiWeatherDataResponse {
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    weather: Array<{
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
        deg: number;
    };
    sys: {
        sunrise: number;
        sunset: number;
    };
    visibility: number;
    clouds: {
        all: number;
    };
}
