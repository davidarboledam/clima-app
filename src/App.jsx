import { useState } from 'react';
import './App.css'
import { useEffect } from 'react';
const key = "5c5faebc197342d29731a4523a39acfd";
import axios, * as others from 'axios';
import { WeatherCard } from './components/WeatherCard';



function App() {

  const [weather, setWeather] = useState();

  const [coords, setCoords] = useState();

  const [temp, setTemp] = useState();

  const [isLoading, setIsLoadging] = useState(true);
  
  const success = (pos) => {
  
    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
    }, []);


    useEffect(() => {
      if (coords) {
        const {lat, lon} = coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
        axios.get(url)
          .then(res => {
            const kel = res.data.main.temp;
            const cel = (kel - 273.15).toFixed(2);
            const fah = (cel * 9/5 +32).toFixed(2);
            setTemp({cel: cel, fah: fah});
            setWeather(res.data);
          })
          .catch(err => console.log(err))
          .finally(() => {
            setIsLoadging(false);
          }, 1000);
      }
    }, [coords]);


  return (
    <div className='app'>
      {
        isLoading ?
          <figure className='app__img'>
            <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnlraGxzcGw5c2E2ZnRiOW1sNG5hbDh4bzJiZ2w3NnZjamJiaTN6ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/aYKTYtCYb2ECSKfyal/giphy.webp" alt="is loading" />
          </figure>
          :
          <WeatherCard 
            weather={weather}
            temp={temp}
          />
      }
    </div>
  )
}

export default App;
