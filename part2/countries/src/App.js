import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const api_key = process.env.REACT_APP_API_KEY;

  const [weather, setWeather] = useState({});


  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response=>setCountries(response.data))
  }, []);

const fetchWeatherData = (capital) => {
  axios
  .get(`https://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
  .then(response =>setWeather(response.data.current))
};

useEffect(() => {
  fetchWeatherData(selectedCountry && selectedCountry.capital);
}, [selectedCountry]);

const handleSearch = (e) => {
  setSearch(e.target.value);
  setFilter(e.target.value !== '');
}

const toggleInfo = (country) => {
  setSelectedCountry(country);
  fetchWeatherData(country.capital);
}

console.log('weather', weather)


const filteredList = countries.filter(country => country.name.common && country.name.common.includes(search));

const showCountryInfo = (country) => {

  const languages = country.languages;
  const flags = country.flags;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>capital {country.area}</p>
      <h2>Languages:</h2>
      <ul>
        {Object.entries(languages).map(([key, value]) =>
          <li key={key}>{value}</li>
        )}
      </ul>
      <br />
      <div>
        <img src={flags.png} alt={country.name.common} />
      </div>

      <div>
      {Object.keys(weather).length > 0 && (
  <div>
    <h2>Weather:</h2>
    <p>Temperature: {weather.temperature}°C</p>
    <p>Description: {weather.weather_descriptions}</p>
  </div>
)}
</div>


    </div>
  )
}

const countriesList = () => {
  if (filter) {

    if (filteredList.length >= 10) {
      return (<div>Too many matches, specify another filter</div>)
    }

    else if (filteredList.length === 1) {

      return showCountryInfo(filteredList[0]);

    }
    return (
      filteredList.map(country => (
        <div>
          <div key={country.name.common}>
            <li>
              {country.name.common}
              <button onClick={() => toggleInfo(country)}>show</button>
            </li>
          </div>
          {/* {selectedCountry && showCountryInfo(selectedCountry)} */}
        </div>
      )))
  }

  return (countries.map(country =>
    <li>{country.name.common}</li>)
  )

}


return (
  <div className="App">
    <label htmlFor="search">Find countries</label>
    <input id="search" type="text" name="search" value={search} onChange={handleSearch}></input>
    <ul>
      {countriesList()}
    </ul>
    {selectedCountry && showCountryInfo(selectedCountry)}
  </div>
);
}

export default App;
