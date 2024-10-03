import React, { useEffect, useState } from 'react'
import { WeatherInfoProps } from '../../interfaces/props/WeatherInfoProps';
import './WeatherInfo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faDroplet, faEye, faWind, faTachometerAlt, faCloud, faCompass } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import BackgroundVideo from '../BackgroundVideo/BackgroundVideo';

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
                        <FontAwesomeIcon icon={faLocationDot} className={`location-icon ${isDay ? 'day' : 'night'}`} />
                    </div>
                    <p className='weather-description'>{weatherData.description}</p>
                </div>
                <div className='temperature-container'>
                    <div className="temperature-info">
                        <p className='current-temperature'>{Math.round(weatherData.temperature)}°C</p>
                        <img className='current-temperature-icon' src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="Weather icon" />
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

export default WeatherInfo;