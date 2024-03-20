import React from "react";
import "./current-weather.css";

const CurrentWeather = ({ data,getWeatherIcon}) => {
  // Convert the date string to a Date object
  const dateObject = new Date(data.data.time);
  // Extract the date part (YYYY-MM-DD)
  const formattedDate = dateObject.toISOString().split('T')[0];

  // Get the appropriate weather icon based on temperature
  const weatherIcon = getWeatherIcon(Math.round(data.data.values.temperature));

  console.log('current weather data is',data);
  return (
    <div className="weather">
        
      <div className="top">
        <div>
          <h2>Today</h2>
          <p className="city">{data.city}</p>
          <p className="weather-description">{formattedDate}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={weatherIcon}
        />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(data.data.values.temperature)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
              {Math.round(data.data.values.temperatureApparent)}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.data.values.windSpeed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.data.values.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.data.values.pressureSurfaceLevel} hPa</span>
          </div>
        </div>
      </div>   
    </div>
  );
};

export default CurrentWeather;