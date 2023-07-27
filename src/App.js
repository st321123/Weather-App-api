import React, { useEffect, useState } from "react";
import coldBg from "./assets/cold.jpg";
import hotBg from "./assets/hot.jpg";

import "./index.css";
import Desc from "./compnents/Desc";
import { getDataFromateed } from "./WeatherService";
function App() {
  const [bg,setBg]  =  useState(hotBg);
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [city, setCity] = useState("Haldwani");
  useEffect(() => {
    const fetchWeatherData = async () => {

      const data = await getDataFromateed(city, units);
      setWeather(data);
      
      const threshol = units === "metric"?20 : 68;
      
      (data.temp <threshol)?setBg(coldBg):setBg(hotBg);
      
    }
    fetchWeatherData();
  }, [city, units]);
  function handleClick(event) {

    units === "metric" ? setUnits("imperial") : setUnits("metric");

  }
  function handleKey(event) {
    if (event.keyCode == 13) {
      setCity(event.currentTarget.value);
      event.currentTarget.blur();
    }


  }
  
  // if(weather.temp < 20 )
  // setBg(coldBg);
  // else
  // setBg(hotBg);
  return (<div className="app" style={{ backgroundImage: `url(${bg})` }}>
    <div className="overlay">
      {weather && (<div className="container">
        <div className="section section__inputs">
          <input name="city" placeholder="Enter city name...." onKeyDown={handleKey} />
          <button onClick={handleClick}>{units === "metric" ? "°F" : "°C"}</button>
        </div>
        <div className="section section__temperature">
          <div className="icon">
            <h1>{`${weather.name},${weather.country}`}</h1>
            <img src={weather.iconUrl} alt="weather-icon" />
            <h3>{weather.description}</h3>
          </div>
          <div className="temperature" >
            <h1>{`${weather.temp.toFixed()} °${units === "metric" ? "C" : "F"}`}</h1>
          </div>
        </div>
        <Desc weather={weather} units={units} />

      </div>)}
    </div>
  </div>)
}
export default App;