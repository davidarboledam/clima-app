import React, { useState } from 'react'
import "./styles/weathercard.css";

export const WeatherCard = ({weather, temp}) => {

    const [isCel, setIsCel] = useState(true);

    const handleTemp = () => {
        setIsCel(!isCel);
    }
    
  return (
    <div className='weathercard'>
        <h1 className='weathercard__title'>Weather App</h1>
        <h2 className='weathercard__city'>{weather?.name}, {weather?.sys.country}</h2>
        <section className='weathercard__body'>
            <figure className='weathercard__img'>
                <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="weather image" />
            </figure>
            <article className='weathercard_data'>
                <h3 className='weathercard__description'>"{weather?.weather[0].description}"</h3>
                <ul className='weathercard_list'>
                    <li className='weathercard__item'><span>Wind speed </span><span>{weather?.wind.speed} m/s</span></li>
                    <li className='weathercard__item'><span>Clouds </span><span>{weather?.clouds.all} %</span></li>
                    <li className='weathercard__item'><span>Pressure </span><span>{weather?.main.pressure} hPa</span></li>
                </ul>
            </article>
        </section>
        <h2>
            {
                isCel ? 
                    temp?.cel  + " ºC"
                    : 
                    temp?.fah + " ºF"
            }
        </h2>
        <button className='weathercard__btn' onClick={handleTemp}>
            change to {isCel ? "ºF" : "ºC"}
        </button>
    </div>
  )
}
