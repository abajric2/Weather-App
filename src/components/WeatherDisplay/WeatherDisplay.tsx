import React from 'react'
import { WeatherDisplayProps } from '../../interfaces/WeatherDisplayProps';
import './WeatherDisplay.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, city }) => {
    const isDayTime = () => {
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime >= weatherData.sunrise && currentTime < weatherData.sunset
    }
    return (
        <div className={`weather-display ${isDayTime() ? 'day' : 'night'}`}>
            <div className='main-info-container'>
                <div className='location-container'>
                    <div className="location-info">
                        <h2 className="city-name">{city}</h2>
                        <FontAwesomeIcon icon={faLocationDot} style={{ color: "#ffffff" }} className="location-icon" />
                    </div>
                    <p className='weather-description'>{weatherData.description}</p>
                </div>
                <div className='temperature-container'>
                    <div className="temperature-info">
                        <p className='current-temperature'>{Math.round(weatherData.temperature)}°C</p>
                        <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="Weather icon" />
                    </div>
                    <p className='feels-like'>Feels Like: {Math.round(weatherData.feelsLike)}°C</p>
                </div>
            </div>
        </div>
    );
}

export default WeatherDisplay;