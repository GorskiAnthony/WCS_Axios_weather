import React, {useEffect, useState} from "react";
import axios from "axios";

const App = () => {

    const [weather, setWeather] = useState("");
    const [icon, setIcon] = useState("");
    const [ville, setVille] = useState('paris')

    const coord = {
        paris: {
            lat: 48.866068,
            lon: 2.356252
        },
        marseille: {
            lat: 43.30074779101849,
            lon: 5.393918036829284

        }
    }

    const TOKEN = "your_token, go on https://openweathermap.org/ and create account !";

    const API = `https://api.openweathermap.org/data/2.5/weather?lat=${coord[ville].lat}&lon=${coord[ville].lon}&appid=${TOKEN}&lang=fr&units=metric`;

    console.log(API)

    useEffect(() => {
        axios.get(API)
            .then(response => response.data)
            .then(data => {
                setWeather(data.weather[0].description);
                setIcon(data.weather[0].icon)
            })
            .catch(e => console.error(e));
    }, [ville])

    const handleClick = () => {
        let city = ville === "paris" ? "marseille" : "paris";
        setVille(city);
    }

    return (
        <div>
            <button onClick={handleClick}>ville de {ville}</button>
            <h2>Coucou les wilders, sur {ville} le temps est
                <div>
                    <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt=""/>
                    {weather}
                </div>
            </h2>
        </div>
    )

}

export default App;