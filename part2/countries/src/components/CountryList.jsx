/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const CountryList = ({ countries, onShowCountry }) => {
  return (
    <div className="country-list">
      {countries.map((country) => (
        <div key={country.name.common} className="country-item">
          <span className="country-name">{country.name.common}</span>
          <button
            onClick={() => onShowCountry(country)}
            className="show-button"
          >
            Show Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
