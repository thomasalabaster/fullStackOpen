import axios from 'axios';
import { useEffect } from 'react';
import Weather from './Weather';

// Func for button to show/hide country data
const toggleCountryInfo = (country, filteredCountries, setFilteredCountries) => {
    const updatedCountries = [...filteredCountries];
    const index = updatedCountries.findIndex((c) => c.cca2 === country.cca2);
    updatedCountries[index].displayInfo = !updatedCountries[index].displayInfo;
    setFilteredCountries(updatedCountries);
}

const Finder = ({ searchCountry, handleCountryChange, 
                    setCountries, filteredCountries, 
                    setFilteredCountries, api_key }) => {
    // content holder 
    let displayingCountries = "";
    
    // Get the country data
    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then(response => {
                setCountries(response.data);
                //Add a displayInfo truthy to each country
                for (let i = 0; i < response.data.length; i++) {
                    response.data[i].displayInfo = false
                }
            })
            .catch(() => {
                alert("Error fetching country data")
                return;
              });
          }, []);
    // Too many countries to display info, prompt to refine filter
    if (filteredCountries.length > 10) {
        displayingCountries = "Too many matches, specify another filter"
    }
    //Display info if just one country filtered
    else if (filteredCountries.length === 1) {
        let temp = filteredCountries[0]
        displayingCountries = [
            <h1 key="name">{temp.name.common}</h1>,
            <p key="capitals">Capital(s) - {temp.capital.join(", ")}</p>,
            <p key="area">Area - {temp.area}</p>,
            <h3 key="languages">Language(s)</h3>,
            <ul key="languages-list">
                {Object.keys(temp.languages).map(key => 
                    <li key={temp.languages[key]}>{temp.languages[key]}</li>)
                }
            </ul>,
            <img key="flag" src={temp.flags.png}></img>
        ]
    }
    // Check if countries length is between 1 and 10
    else if (filteredCountries.length > 1 && filteredCountries.length < 10) {
        displayingCountries = filteredCountries.map((country) => {
            // Display 
            if (country.displayInfo === false) {
                return (
                    <div key={country.cca2}>
                        <p>
                        {country.name.common}{' '}
                        <button
                            onClick={() =>
                            toggleCountryInfo(country, filteredCountries, setFilteredCountries)
                            }
                        >
                            Show
                        </button>
                        </p>
                    </div>
                );
          } 
          else {
            return (
              <div key={country.cca2}>
                <h1>{country.name.common}</h1>
                      {/* Checking if there are multiple capitals */}
                      {country.capital.length > 1 ? (
                        <p>Capital(s) - {country.capital.join(", ")}</p>
                      ) : (
                        <p>Capital(s) - {country.capital}</p>
                      )}
                      <p>Area - {country.area}</p>
                      <h3>Language(s)</h3>
                      <ul>
                        {Object.keys(country.languages).map(key => (
                          <li key={country.languages[key]}>{country.languages[key]}</li>
                        ))}
                      </ul>
                      <img src={country.flags.png} />
                      <div>
                        <button onClick={() => toggleCountryInfo(country, filteredCountries, setFilteredCountries)}>
                          Hide
                        </button>
                      </div>
                    </div>
                  );
          }
        });
    }
    else {
        displayingCountries = filteredCountries.map(country => 
            <div>
                <p key={country.name.common}>
                    {country.name.common}
                </p>
                <button>
                    show
                </button>
            </div>)
    }
    return (
        <div>
            find countries 
            <input 
                value={searchCountry}
                onChange={handleCountryChange}
            />
            <div>
                {displayingCountries}
                {filteredCountries.length === 1 && <Weather country={filteredCountries[0]} />}
                
            </div>
        </div>
    )
}

export default Finder