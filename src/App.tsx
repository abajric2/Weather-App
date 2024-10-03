import React, { useState, useEffect } from 'react';
import './App.css';
import { WeatherData } from './interfaces/WeatherData';
import Search from './components/Search/Search';
import { fetchWeatherData } from './api/weatherApi';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
import Navbar from './components/Navbar/Navbar';
import { MoonLoader } from 'react-spinners';
import FavoritesList from './components/FavoritesList/FavoritesList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoResultsInfo from './components/NoResultsInfo/NoResultsInfo';
import ErrorDisplay from './components/ErrorDisplay/ErrorDisplay';

function App() {
  const [city, setCity] = useState<string>('Sarajevo');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [favoriteCities, setFavoriteCities] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem('favoriteCities');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
  }, [favoriteCities]);

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
        toast.success(`"${city}" added to favorite cities list!`);
        return [...prevFavorites, city];
      }
      toast.info(`"${city}" is already in favorite cities list!`);
      return prevFavorites
    });
  };

  const toggleMenu = () => {
    setIsMenuVisible(true);
    setIsMenuOpen(prev => !prev);
  };

  const currentCityUpdate = (city: string) => {
    setCity(city);
    setIsMenuOpen(false);
  }

  return (
    <div className="app-container">
      <Navbar toggleMenu={toggleMenu}>
        <Search onSearch={currentCityUpdate} />
      </Navbar>
      {isMenuVisible && <FavoritesList
        favoriteCities={favoriteCities}
        onClose={toggleMenu}
        onSelect={currentCityUpdate}
        isMenuOpen={isMenuOpen}
      />
      }
      {isLoading && (
        <div className="loader">
          <MoonLoader />
          <p>Loading...</p>
        </div>
      )}
      {!isLoading && !error && (
        weatherData ?
          <WeatherInfo
            weatherData={weatherData}
            city={city}
            favoriteCities={favoriteCities}
            addToFavorites={addToFavorites}
          /> :
          <NoResultsInfo city={city} />
      )}
      {!isLoading && error && (
        <ErrorDisplay errorMessage={error} />
      )}
      <ToastContainer />
    </div>
  );

}

export default App;
