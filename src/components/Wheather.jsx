import React, { useEffect, useRef, useState } from 'react'
import '../components/Wheather.css'
import searcj from '../assets/searcj-icon.png'
import drizzle from '../assets/drizzle.png'
import night_drizzle from '../assets/night-rain.png'
import cloudy_night from '../assets/cloudy-night.png'
import humidity from '../assets/humidity.png'
import rainy from '../assets/rainy.png'
import snow from '../assets/snow-fall.png'
import sunny from '../assets/sunny.png'
import wind from '../assets/wind.png'
import cloudy from '../assets/cloudy.png'
import moon from '../assets/moon.png'

function Wheather() {


    const inputRef = useRef()
  const[weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d":sunny,
    "01n":moon,
    "02d": cloudy,
    "02n":cloudy_night,
    "03d":cloudy,
    "03n":cloudy_night,
    "04d":drizzle,
    "04n" :night_drizzle,
    "09d": rainy,
    "09n":night_drizzle,
    "10d":rainy,
    "10n":night_drizzle,
    "11d":rainy,
    "11n":night_drizzle,
    "13d":snow,
    "13n":snow,
    "50n":moon,
    "50d":cloudy

  }
// const wetherIcon = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`
   const search = async (city) =>{
    if(city == ""){
        alert("enter city name")
        return;
    }
    try{
        const URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=77ba226291ca17fbbf8d087b7dfd7b66`
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
    setWeatherData(false)
    alert("some error occured!")
    }
   }

  useEffect(() => {
    search("London");
  },[])

  return (
   <>
       <div className="heading">
       <h1>My Weather app</h1>
       </div>
    <div className='wheather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='search' />
        <img src={searcj} alt="search-icon" onClick={() => search(inputRef.current.value)}/>
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
   </>
  )
}

export default Wheather