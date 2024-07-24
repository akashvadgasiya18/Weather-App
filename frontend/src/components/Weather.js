import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import clear_icon from "../assets/sun.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import mist from "../assets/mist.png";

const Weather = () => {
  const [weatherdata, setweatherdata] = useState(false);
  const inputRef = useRef();

  const allIcon = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": mist,
    "50n": mist,
  };

  const fetchData = async (city) => {
    try {
      if (city === "") {
        alert("Enter city name..");
        return;
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=32be7fecbb6038abbd0535807fe34283`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        return alert("city not found..");
      }

      console.log(data);
      const icon1 = allIcon[data.weather[0].icon] || clear_icon;

      setweatherdata({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon1,
      });
    } catch (error) {
      setweatherdata(false);
      console.error("error in fetching data...");
    }
  };
  useEffect(() => {
    fetchData("Rajasthan");
  }, []);
  return (
    <div className="weather-main">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="seach.." />
        <i
          class="fa-solid fa-magnifying-glass"
          onClick={() => fetchData(inputRef.current.value)}
        ></i>
      </div>
      {weatherdata ? (
        <>
          <img src={weatherdata.icon} alt="" />
          <p className="temp">{weatherdata.temperature}°C</p>
          <p className="location">{weatherdata.location}</p>
          <div className="weather-data">
            <div className="col">
              <i class="fa-solid fa-water"></i>
              <div>
                <p>{weatherdata.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <i class="fa-solid fa-wind"></i>
              <div>
                <p>{weatherdata.windSpeed} Km/h</p>
                <span>wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
