import React, { useState, useEffect } from 'react';
import './App.css';
import { WeatherData } from './interfaces/WeatherData';
import Search from './components/Search/Search';
import { fetchWeatherData } from './api/weatherApi';

function App() {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (city) {
        try {
          const data = await fetchWeatherData(city);
          setWeatherData(data);
        } catch (error) {
          setWeatherData(null);
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
