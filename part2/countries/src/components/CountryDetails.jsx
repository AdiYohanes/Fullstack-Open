/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import countriesService from "../services/countries";

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await countriesService.getWeather(country.capital[0]);
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (country.capital) fetchWeather();
  }, [country.capital]);

  return (
    <div className="country-details">
      <div className="details-header">
        <h2 className="details-title">{country.name.common}</h2>
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="details-flag"
        />
      </div>

      <div className="info-grid">
        <div className="info-card">
          <p className="info-label">Capital</p>
          <p className="info-value">
            {country.capital ? country.capital[0] : "N/A"}
          </p>
        </div>

        <div className="info-card">
          <p className="info-label">Area</p>
          <p className="info-value">{country.area.toLocaleString()} km²</p>
        </div>

        <div className="info-card">
          <p className="info-label">Languages</p>
          <ul className="languages-list">
            {Object.values(country.languages || {}).map((language, index) => (
              <li key={index} className="language-item">
                {language}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {weather && (
        <div className="weather-report">
          <h3>Weather in {country.capital[0]}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/10d@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
