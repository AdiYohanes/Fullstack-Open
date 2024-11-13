import { useState, useEffect } from "react";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";
import countriesService from "./services/countries";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await countriesService.getAllCountries();
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setQuery(searchValue);

    if (searchValue === "") {
      setFilteredCountries([]);
      setSelectedCountry(null);
      return;
    }

    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCountries(filtered);
    setSelectedCountry(null);
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  if (loading) {
    return <div className="loading">Loading countries...</div>;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Country Explorer</h1>
      </header>

      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          className="search-input"
          placeholder="Search for a country..."
        />
      </div>

      {filteredCountries.length > 10 ? (
        <div className="message">
          Too many matches, please specify your query
        </div>
      ) : filteredCountries.length > 1 ? (
        <CountryList
          countries={filteredCountries}
          onShowCountry={handleShowCountry}
        />
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : (
        query && <div className="message">No matches found</div>
      )}

      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </div>
  );
};

export default App;
