import React, { useState, useEffect } from 'react';
import './App.css';
import { WeatherData } from './interfaces/WeatherData';
import Search from './components/Search/Search';
import { fetchWeatherData } from './api/weatherApi';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [city, setCity] = useState<string>('Sarajevo');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      if (city) {
        try {
          const data = await fetchWeatherData(city);
          setWeatherData(data);
          setError(null)
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'ERROR: An unknown error occurred';
          setWeatherData(null);
          setError(errorMessage);
        }
      }
    }

    fetchWeather();
  }, [city])

  return (
    <div className="app-container">
      <Navbar>
        <Search onSearch={setCity} />
      </Navbar>
      {weatherData ? <WeatherDisplay weatherData={weatherData} city={city} /> : error}
    </div>
  );

}

export default App;
