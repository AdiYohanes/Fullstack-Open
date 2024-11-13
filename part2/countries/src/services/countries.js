// jsx/countries.js
import axios from "axios";

const countriesUrl = "https://restcountries.com/v3.1/all";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const api_key = import.meta.env.VITE_WEATHER_API_KEY;

// Fungsi untuk mengambil semua data negara
const getAllCountries = async () => {
  try {
    const response = await axios.get(countriesUrl);
    return response.data; // Mengembalikan data negara
  } catch (error) {
    console.error("Error fetching countries data:", error);
    throw error;
  }
};

// Fungsi untuk mengambil data cuaca berdasarkan ibu kota
const getWeather = async (capital) => {
  try {
    const response = await axios.get(
      `${weatherUrl}?q=${capital}&appid=${api_key}&units=metric`
    );
    return response.data; // Mengembalikan data cuaca
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export default { getAllCountries, getWeather };
