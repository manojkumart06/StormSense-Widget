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
import sunnyClodyIcon from "./icons/sunny_cloudy.png"

// Define the getWeatherIcon function
const getWeatherIcon = (temperature) => {
  if (temperature < 0) {
    return snowyIcon;
  } else if (temperature < 10) {
    return cloudyIcon;
  } else if (temperature > 27) {
    return sunnyIcon;
  } else {
    return sunnyClodyIcon; 
  }
};


function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [loc] = searchData.value.split(" ");
    
    // Set loading state to true when fetching data starts
    setLoading(true);
    setError(null); // Reset error state

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}?location=${loc}&apikey=${WEATHER_API_KEY}`
    );
    const forecastFetch = fetch(
      `${FORECAST_API_URL}?location=${loc}&apikey=${WEATHER_API_KEY}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        // Check if response status is ok
        if (!response.every((res) => res.ok)) {
          throw new Error("Failed to fetch weather data");
        }

        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
        setLoading(false); // Set loading state to false when data fetching is complete
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error.message);
        setError("Failed to fetch weather data"); // Set error state with appropriate message
        setLoading(false); // Set loading state to false when error occurs
      });
  };

  return (
    <>
      <div className="container">
          <Header />
          <Search onSearchChange={handleOnSearchChange} />
          {/* Conditionally render loading indicator or error message */}
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {/* Render current weather and forecast components if data is available */}
          {currentWeather && <CurrentWeather data={currentWeather} getWeatherIcon={getWeatherIcon} />}
          
          {forecast && <Forecast data={forecast} getWeatherIcon={getWeatherIcon} />}
      </div>
    </>
  );
}

export default App;