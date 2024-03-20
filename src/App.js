import React, { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, FORECAST_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";
import Header from "./components/header/Header";
import sunnyIcon from "./icons/sunnyicon.png";
import cloudyIcon from "./icons/cloudyicon.png";
import snowyIcon from "./icons/snowicon.png";

// Define the getWeatherIcon function
const getWeatherIcon = (temperature) => {
  if (temperature < 0) {
    return snowyIcon;
  } else if (temperature < 15) {
    return cloudyIcon;
  } else {
    return sunnyIcon;
  }
};

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [loc] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}?location=${loc}&apikey=${WEATHER_API_KEY}`
    );
    const forecastFetch = fetch(
      `${FORECAST_API_URL}?location=${loc}&apikey=${WEATHER_API_KEY}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        // Check if response status is ok
        if (!response.every(res => res.ok)) {
          throw new Error('Failed to fetch weather data');
        }

        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch(error => {
        console.error('Error fetching weather data:', error.message);
        // Optionally, you can update state or display an error message to the user
      });
  };

  return (
    <>
      <div className="container">
        <div className="container-1">
          <Header />
          <Search onSearchChange={handleOnSearchChange} />
          {currentWeather && <CurrentWeather data={currentWeather} getWeatherIcon={getWeatherIcon} />}
          {forecast && <Forecast data={forecast} getWeatherIcon={getWeatherIcon} />}
        </div>
      </div>
    </>
  );
}  

export default App;
