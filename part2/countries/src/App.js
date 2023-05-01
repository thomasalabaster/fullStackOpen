import { useState } from "react";
import Finder from "./components/Finder";

function App() {
  const api_key = process.env.REACT_APP_API_KEY

  const [searchCountry, setSearchCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  
  const handleCountryChange = (event) => {
    setSearchCountry(event.target.value)
    setFilteredCountries(countries.filter(country => {
      const countryName = country.name.common.toLowerCase()
      return countryName.includes(searchCountry.toLowerCase())
    }))
  }
  return (
    <div>
      <Finder 
        searchCountry={searchCountry} 
        handleCountryChange={handleCountryChange}
        setCountries={setCountries}
        filteredCountries={filteredCountries}
        setFilteredCountries={setFilteredCountries}
        api_key={api_key}
      />
    </div>
  );
}

export default App;
