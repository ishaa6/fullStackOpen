import axios from "axios";
import {useState, useEffect} from 'react';

const Weather = ({city}) => {
    const [weather, setWeather] = useState(null);
    const URL = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        console.log(API_KEY);
        axios
        .get(URL, {
            params: {
            q: city,
            appid: API_KEY,
            units: "metric"
            }
        })
        .then(response => {
            setWeather(response.data);
            console.log("Fetched weather");
            console.log(weather);
        })
        .catch(err => console.log("Weather fetch error:", err));
    }, [city]);

    if (!weather) return

    const iconCode = weather.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return (
        <div>
            <h2>Weather in {city}</h2>
            <img src={iconUrl} alt="weather icon" />
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather;