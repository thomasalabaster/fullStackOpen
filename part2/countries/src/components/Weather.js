import axios from 'axios';
import { useEffect, useState } from 'react';

const Weather = ({ country }) => { 
    // Get all country variables, including API_KEY
    let lat = country.latlng[0]
    let lon = country.latlng[1]
    const api_key = process.env.REACT_APP_API_KEY
    let name = country.name.common
    // state variables, rerender once data has been received
    const [temp, setTemp] = useState(0)
    const [wind, setWind] = useState(0)
    const [icon, setIcon] = useState(false)

    axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
        .then(response => {
            setTemp((response.data.main.temp - 273).toFixed(2))
            setWind(response.data.wind.speed)
            setIcon(response.data.weather[0].icon)
            })
        .catch(error => console.log(error))

        return (
            <div key={country.cca2}>
                <h2>Weather in {name}</h2>
                <p>Temperature:  {temp} °C</p>
                {/* Ensure icon is loaded properly, ensure has a value */}
                {icon && <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt="weather icon" />}
                <p>Wind speed: {wind} m/s</p>
            </div>
        )
}

export default Weather