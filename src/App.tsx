import React, { useState, useEffect } from 'react';
import './App.css';
import { WeatherData } from './interfaces/WeatherData';
import Search from './components/Search/Search';
import { fetchWeatherData } from './api/weatherApi';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
import Navbar from './components/Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faFrown } from '@fortawesome/free-solid-svg-icons';
import { MoonLoader } from 'react-spinners';

function App() {
  const [city, setCity] = useState<string>('Sarajevo');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (city) {
        try {
          setIsLoading(true)
          setError(null)
          const data = await fetchWeatherData(city);
          setWeatherData(data);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'ERROR: An unknown error occurred';
          setWeatherData(null);
          setError(errorMessage);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchWeather();
  }, [city]);

  const addToFavorites = (city: string) => {
    setFavoriteCities((prevFavorites) => {
      if (!prevFavorites.some(favCity => favCity.toLowerCase() === city.toLowerCase())) {
        return [...prevFavorites, city];
      }
      return prevFavorites
    });
  };

  return (
    <div className="app-container">
      <Navbar>
        <Search onSearch={setCity} />
      </Navbar>
      {isLoading && (
        <div className="loader">
          <MoonLoader />
          <p>Loading...</p>
        </div>
      )}
      {!isLoading && !error && (
        weatherData ?
          <WeatherInfo weatherData={weatherData} city={city} addToFavorites={addToFavorites} /> :
          <div className="no-result-info">
            <FontAwesomeIcon icon={faFrown} className="no-result-icon" />
            <h1>No results for "{city}"</h1>
          </div>
      )}
      {!isLoading && error && (
        <div className="error-display">
          <div className="error-title">
            <FontAwesomeIcon className="error-icon" icon={faTriangleExclamation} />
            <h1>ERROR</h1>
          </div>
          <p>{error}</p>
        </div>
      )}
      <div>
        <p>Favorites</p>
        {favoriteCities.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );

}

export default App;
