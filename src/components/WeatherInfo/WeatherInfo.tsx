import React, { useEffect, useState } from 'react'
import { WeatherInfoProps } from '../../interfaces/props/WeatherInfoProps';
import './WeatherInfo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faDroplet, faEye, faWind, faTachometerAlt, faCloud, faCompass } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import BackgroundVideo from '../BackgroundVideo/BackgroundVideo';
import { WeatherData } from '../../interfaces/WeatherData';
import classNames from 'classnames';

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weatherData, city, favoriteCities, addToFavorites }) => {
    const [isDay, setIsDay] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const weatherInfoItems = [
        { icon: faDroplet, label: 'Humidity', value: `${weatherData.humidity}%` },
        { icon: faEye, label: 'Visibility', value: `${weatherData.visibility / 1000} km` },
        { icon: faWind, label: 'Wind speed', value: `${Math.round(weatherData.windSpeed)} km/h` },
        { icon: faTachometerAlt, label: 'Pressure', value: `${weatherData.pressure} hPa` },
        { icon: faCloud, label: 'Cloudiness', value: `${weatherData.cloudiness}%` },
        { icon: faCompass, label: 'Wind direction', value: `${weatherData.windDirection}°` },
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
            <FontAwesomeIcon
                icon={isHovered || isFavoriteCity()
                    ? faHeartSolid
                    : faHeartRegular}
                style={isHovered || isFavoriteCity()
                    ? { color: 'red' }
                    : {}}
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
                <FontAwesomeIcon
                    icon={faLocationDot}
                    className={classNames('location-icon', { 'day': isDay, 'night': !isDay })}
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
            <FontAwesomeIcon
                icon={icon}
                className='info-item-icon'
            />
            <p>{label}</p>
        </div>
        <p>{value}</p>
    </div>
);

export default WeatherInfo;