import React, { useEffect, useState } from 'react'
import { WeatherInfoProps } from '../../interfaces/props/WeatherInfoProps';
import './WeatherInfo.css'
import BackgroundVideo from '../BackgroundVideo/BackgroundVideo';
import { WeatherData } from '../../interfaces/WeatherData';
import classNames from 'classnames';

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weatherData, city, favoriteCities, addToFavorites }) => {
    const [isDay, setIsDay] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const weatherInfoItems = [
        { icon: (isDay ? '/icons/droplet-day-icon.svg' : '/icons/droplet-night-icon.svg'), label: 'Humidity', value: `${weatherData.humidity}%` },
        { icon: (isDay ? '/icons/eye-day-icon.svg' : '/icons/eye-night-icon.svg'), label: 'Visibility', value: `${weatherData.visibility / 1000} km` },
        { icon: (isDay ? '/icons/wind-day-icon.svg' : '/icons/wind-night-icon.svg'), label: 'Wind speed', value: `${Math.round(weatherData.windSpeed)} km/h` },
        { icon: (isDay ? '/icons/tachometer-day-icon.svg' : '/icons/tachometer-night-icon.svg'), label: 'Pressure', value: `${weatherData.pressure} hPa` },
        { icon: (isDay ? '/icons/cloud-day-icon.svg' : '/icons/cloud-night-icon.svg'), label: 'Cloudiness', value: `${weatherData.cloudiness}%` },
        { icon: (isDay ? '/icons/compass-day-icon.svg' : '/icons/compass-night-icon.svg'), label: 'Wind direction', value: `${weatherData.windDirection}°` },
    ];

    const isFavoriteCity = (): boolean => {
        return favoriteCities.some(favCity => favCity.toLowerCase() === city.toLowerCase())
    }

    useEffect(() => {
        const currentTime = Math.floor(Date.now() / 1000);
        setIsDay(currentTime >= weatherData.sunrise && currentTime < weatherData.sunset);
    }, [weatherData]);

    return (
        <div className={classNames('weather-display', { 'day': isDay, 'night': !isDay })}>
            <BackgroundVideo isDay={isDay} />
            <MainWeatherInfo
                city={city}
                weatherData={weatherData}
                isDay={isDay}
            />
            <div className='weather-info-grid'>
                {weatherInfoItems.map((item, index) => (
                    <WeatherInfoItem
                        key={index}
                        icon={item.icon}
                        label={item.label}
                        value={item.value}
                        isDay={isDay}
                    />
                ))}
            </div>
            <img
                src={isHovered || isFavoriteCity()
                    ? '/icons/filled-heart-red-icon.svg'
                    : (isDay
                        ? '/icons/empty-heart-day-icon.svg'
                        : '/icons/empty-heart-night-icon.svg'
                    )
                }
                alt="Heart Icon"
                className='add-to-favorites'
                title='Add to favorite cities'
                onClick={() => addToFavorites(city)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />
        </div>
    );
}

interface MainWeatherInfoProps {
    city: string;
    weatherData: WeatherData;
    isDay: boolean;
}

const MainWeatherInfo: React.FC<MainWeatherInfoProps> = ({ city, weatherData, isDay }) => (
    <div className='main-info-container'>
        <div className='location-container'>
            <div className="location-info">
                <h2 className="city-name">{city}</h2>
                <img
                    src={isDay ? `/icons/location-dot-day-icon.svg` : `/icons/location-dot-icon.svg`}
                    alt="Location Dot Icon"
                    className='location-icon'
                />
            </div>
            <p className='weather-description'>{weatherData.description}</p>
        </div>
        <div className='temperature-container'>
            <div className="temperature-info">
                <p className='current-temperature'>{Math.round(weatherData.temperature)}°C</p>
                <img
                    className='current-temperature-icon'
                    src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                    alt="Weather icon"
                />
            </div>
            <p className='feels-like'>feels like: {Math.round(weatherData.feelsLike)}°C</p>
        </div>
    </div>
);

interface WeatherInfoItemProps {
    icon: any;
    label: string;
    value: string;
    isDay: boolean;
}

const WeatherInfoItem: React.FC<WeatherInfoItemProps> = ({ icon, label, value, isDay }) => (
    <div className={classNames('weather-info-item', { 'day': isDay, 'night': !isDay })}>
        <div className='info-item-caption'>
            <img
                className='info-item-icon'
                src={icon}
                alt="Weather data icon"
            />
            <p>{label}</p>
        </div>
        <p>{value}</p>
    </div>
);

export default WeatherInfo;