import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Forecast component to display upcoming days' weather synopsis
const Forecast = ({ data, getWeatherIcon }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  console.log('Forecast data is', data);
  console.log('daily wise', data.timelines.daily);

  return (
    <>
      <label className="title">Upcoming Days Synopsis</label>
      <Accordion allowZeroExpanded>
        {data.timelines.daily.map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  {/* Used temperatureApparentAvg to determine the icon */}
                  <img src={getWeatherIcon(item.values.temperatureApparentAvg)} className="icon-small" alt="weather" />
                  <label className="day">{forecastDays[idx]}</label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure :</label>
                  <label>{item.values.pressureSurfaceLevelMax}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity :</label>
                  <label>{item.values.humidityAvg}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds :</label>
                  <label>{item.values.cloudCoverAvg}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind speed :</label>
                  <label>{item.values.windSpeedAvg} m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea level :</label>
                  <label>{item.values.pressureSurfaceLevelAvg}m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like :</label>
                  <label>{item.values.temperatureApparentAvg}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
