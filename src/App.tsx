import React, { useState, useEffect } from 'react';
import './App.css';
import { WeatherData } from './interfaces/WeatherData';
import Search from './components/Search/Search';
import { fetchWeatherData } from './api/weatherApi';

function App() {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      if (city) {
        try {
          const data = await fetchWeatherData(city);
          setWeatherData(data);
          console.log(city)
          setError(null)
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Error: An unknown error occurred';
          setWeatherData(null);
          setError(errorMessage); 
        }
      }
    }
    fetchWeather();
  }, [city])

  return (
    <div className="App">
      <Search onSearch={setCity}/>
    </div>
  );
}

export default App;
