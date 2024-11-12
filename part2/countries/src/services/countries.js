// services/countries.js
import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

// Fungsi untuk mengambil data cuaca berdasarkan nama ibu kota
const getWeather = (capital) => {
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;
  return axios
    .get(`${weatherUrl}?q=${capital}&appid=${api_key}&units=metric`)
    .then((response) => response.data);
};

export default { getAll, getWeather };
