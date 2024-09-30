import React, { useEffect, useState } from 'react'
import { WeatherDisplayProps } from '../../interfaces/props/WeatherDisplayProps';
import './WeatherDisplay.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faDroplet, faEye, faWind, faTachometerAlt, faCloud, faCompass } from '@fortawesome/free-solid-svg-icons';
import BackgroundVideo from '../BackgroundVideo/BackgroundVideo';

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, city }) => {
    const [isDay, setIsDay] = useState(false);
    const weatherInfoItems = [
        { icon: faDroplet, label: 'Humidity', value: `${weatherData.humidity}%` },
        { icon: faEye, label: 'Visibility', value: `${weatherData.visibility / 1000} km` },
        { icon: faWind, label: 'Wind speed', value: `${Math.round(weatherData.windSpeed)} km/h` },
        { icon: faTachometerAlt, label: 'Pressure', value: `${weatherData.pressure} hPa` },
        { icon: faCloud, label: 'Cloudiness', value: `${weatherData.cloudiness}%` },
        { icon: faCompass, label: 'Wind direction', value: `${weatherData.windDirection}°` },
    ];

    useEffect(() => {
        const isDayTime = (): boolean => {
            const currentTime = Math.floor(Date.now() / 1000);
            return currentTime >= weatherData.sunrise && currentTime < weatherData.sunset;
        }

        setIsDay(isDayTime());
    }, [weatherData]);

    return (
        <div className={`weather-display ${isDay ? 'day' : 'night'}`}>
            <BackgroundVideo isDay={isDay} />
            <div className='main-info-container'>
                <div className='location-container'>
                    <div className="location-info">
                        <h2 className="city-name">{city}</h2>
                        <FontAwesomeIcon icon={faLocationDot} style={isDay ? { color: 'rgb(5, 5, 84)' } : { color: "#ffffff" }} className="location-icon" />
                    </div>
                    <p className='weather-description'>{weatherData.description}</p>
                </div>
                <div className='temperature-container'>
                    <div className="temperature-info">
                        <p className='current-temperature'>{Math.round(weatherData.temperature)}°C</p>
                        <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="Weather icon" />
                    </div>
                    <p className='feels-like'>feels like: {Math.round(weatherData.feelsLike)}°C</p>
                </div>
            </div>
            <div className='weather-info-grid'>
                {weatherInfoItems.map((item, index) => (
                    <div key={index} className={`weather-info-item ${isDay ? 'day' : 'night'}`}>
                        <div className='info-item-caption'>
                            <FontAwesomeIcon icon={item.icon} className='info-item-icon' />
                            <p>{item.label}</p>
                        </div>
                        <p>{item.value}</p>
                    </div>))}
            </div>
        </div>
    );
}

export default WeatherDisplay;