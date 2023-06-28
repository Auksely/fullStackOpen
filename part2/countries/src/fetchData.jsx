import { useEffect } from "react";

const CountryDataFetcher = ({ setCountries }) => {
    useEffect(() => {
        const fetchCountriesData = async () => {
          try {
            const response = await fetch('https://studies.cs.helsinki.fi/restcountries/api/all');
            const data = await response.json();
            setCountries(data);
          } catch (error) {
            console.error('Error fetching address data:', error);
          }
        };
    
        fetchCountriesData();
      }, []);

  return null;
};

export default CountryDataFetcher;
