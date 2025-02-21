import React, { useEffect, useState } from 'react'
import '../components/Wheather.css'
import searcj from '../assets/searcj-icon.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rainy from '../assets/rainy.png'
import snow from '../assets/snow-fall.png'
import sunny from '../assets/sunny.png'
import wind from '../assets/wind.png'
import cloudy from '../assets/cloudy.png'

function Wheather() {

  const[weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d":sunny,
    "01n":sunny,
    "02d": cloudy,
    "02n":cloudy,
    "03d":cloudy,
    "03n":cloudy,
    "04d":drizzle,
    "04n" :drizzle,
    "09d": rainy,
    "09n":rainy,
    "10d":rainy,
    "10n":rainy,

  }

   const search = async (city) =>{
    try{
        const URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_ID}`
        const response = await fetch(URL)
        const data = await response.json();
        console.log(data);
        const icon = allIcons[data.weather[0].icon] || sunny
        setWeatherData({
            humidity:data.main.humidity,
            windSpeed:data.wind.speed,
            temprature:Math.floor(data.main.temp),
            location:data.name,
            icon:icon,
        })
    }
    catch{

    }
   }

  useEffect(() => {
    search("London");
  },[])

  return (
    <div className='wheather'>
      <div className="search-bar">
        <input type="text" placeholder='search' />
        <img src={searcj} alt="search-icon" />
      </div>

      <img src={weatherData.icon} alt="" className='wheather-icon' />
      <p className='temprature'>{weatherData.temprature}'C</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
            <img src={humidity} alt="humidity" />
            <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind} alt="wind" />
            <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Wheather