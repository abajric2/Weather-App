import React, { useEffect, useRef, useState } from 'react'
import { WeatherDisplayProps } from '../../interfaces/WeatherDisplayProps';
import './WeatherDisplay.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faDroplet, faEye, faWind, faTachometerAlt, faCloud, faCompass } from '@fortawesome/free-solid-svg-icons';

const dayBackground = '/videos/daySky.mp4';
const nightBackground = '/videos/nightSky.mp4';


const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, city }) => {
    const [isDay, setIsDay] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const isDayTime = () => {
            const currentTime = Math.floor(Date.now() / 1000);
            return currentTime >= weatherData.sunrise && currentTime < weatherData.sunset;
        }
        setIsDay(isDayTime());

        if (videoRef.current) {
            videoRef.current.src = isDay ? dayBackground : nightBackground;
            videoRef.current.load(); 

            const handleCanPlayThrough = () => {
                videoRef.current?.play(); 
                videoRef.current?.removeEventListener('canplaythrough', handleCanPlayThrough); 
            };

            videoRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
        }
    }, [weatherData, isDay]);

    return (
        <div className={`weather-display ${isDay ? 'day' : 'night'}`}>
            <video ref={videoRef} autoPlay muted loop className={`background-video ${isDay ? 'day' : 'night'}`}>
                <source src={isDay ? dayBackground : nightBackground} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className='main-info-container'>
                <div className='location-container'>
                    <div className="location-info">
                        <h2 className="city-name">{city}</h2>
                        <FontAwesomeIcon icon={faLocationDot} style={isDay ? {color: 'rgb(5, 5, 84)'}: { color: "#ffffff" }} className="location-icon" />
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
                <div className={`weather-info-item ${isDay ? 'day' : 'night'}`}>
                    <div className='info-caption'>
                        <FontAwesomeIcon icon={faDroplet} className='weather-info-icon' />
                        <p>Humidity</p>
                    </div>
                    <p>{weatherData.humidity}%</p>
                </div>
                <div className={`weather-info-item ${isDay ? 'day' : 'night'}`}>
                    <div className='info-caption'>
                        <FontAwesomeIcon icon={faEye} className='weather-info-icon' />
                        <p>Visibility</p>
                    </div>
                    <p>{weatherData.visibility / 1000} km</p>
                </div>
                <div className={`weather-info-item ${isDay ? 'day' : 'night'}`}>
                    <div className='info-caption'>
                        <FontAwesomeIcon icon={faWind} className='weather-info-icon' />
                        <p>Wind speed</p>
                    </div>
                    <p>{Math.round(weatherData.windSpeed)} km/h</p>
                </div>
                <div className={`weather-info-item ${isDay ? 'day' : 'night'}`}>
                    <div className='info-caption'>
                        <FontAwesomeIcon icon={faTachometerAlt} className='weather-info-icon' />
                        <p>Pressure</p>
                    </div>
                    <p>{weatherData.pressure} hPa</p>
                </div>
                <div className={`weather-info-item ${isDay ? 'day' : 'night'}`}>
                    <div className='info-caption'>
                        <FontAwesomeIcon icon={faCloud} className='weather-info-icon' />
                        <p>Cloudiness</p>
                    </div>
                    <p>{weatherData.cloudiness}%</p>
                </div>
                <div className={`weather-info-item ${isDay ? 'day' : 'night'}`}>
                    <div className='info-caption'>
                        <FontAwesomeIcon icon={faCompass} className='weather-info-icon' />
                        <p>Wind direction</p>
                    </div>
                    <p>{weatherData.windDirection}°</p>
                </div>
            </div>
        </div>
    );
}

export default WeatherDisplay;