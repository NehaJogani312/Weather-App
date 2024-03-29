import React from 'react'
import styles from '../styles/DetailsCard.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from './Spinner'
import UsingCoordinates from './UsingCoordinates'

export default function DetailsCard(props) {
  const [location, setLocation] = useState('')
  const [temp, setTemp] = useState('')
  const [text, setText] = useState('')
  const [windDire, setWindDire] = useState('')
  const [windSpeed, setWindSpeed] = useState('')
  const [humidity, setHumidity] = useState('')
  const [feelsLike, setFeelsLike] = useState('')
  const [visibility, setVisibility] = useState('')
  const [uvIndex, setUvIndex] = useState('')
  const [precip, setPrecip] = useState('')
  const [pressure, setPressure] = useState('')
  const [zeroDay, setZeroDay] = useState('')
  const [plusOneDay, setPlusOneDay] = useState('')
  const [plusTwoDay, setPlusTwoDay] = useState('')
  const [zeroDayMin, setZeroDayMin] = useState('')
  const [zeroDayMax, setZeroDayMax] = useState('')
  const [plusOneDayMin, setPlusOneDayMin] = useState('')
  const [plusOneDayMax, setPlusOneDayMax] = useState('')
  const [plusTwoDayMin, setPlusTwoDayMin] = useState('')
  const [plusTwoDayMax, setPlusTwoDayMax] = useState('')

  const [loading, setLoading] = useState(false)
  const [place, setPlace] = useState('')

  let handleChange = (event) => {
    setPlace(event.target.value);
    getWeatherUsingCityName(place)
  }
  
   function getWeatherUsingCityName(name){
    const options = {
      method: 'GET',
      url: `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${name}&days=4`,
      headers: {
        'X-RapidAPI-Key': '0c5925ba6dmsh60405270bba9b7dp1cb7b6jsnd92b421a77cb',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
      setLoading(true)
      axios.request(options).then(function (response) {
        setLocation(response.data.location.name)
        setTemp(response.data.current.temp_c)
        setText(response.data.current.condition.text)
        setWindDire(response.data.current.wind_degree)
        setWindSpeed(response.data.current.wind_kph)
        setHumidity(response.data.current.humidity)
        setFeelsLike(response.data.current.feelslike_c)
        setVisibility(response.data.current.vis_km)
        setUvIndex(response.data.current.uv)
        setPrecip(response.data.current.precip_mm)
        setPressure(response.data.current.pressure_mb)
        setZeroDay(response.data.forecast.forecastday[0].date)
        setZeroDayMin(response.data.forecast.forecastday[0].day.mintemp_c)
        setZeroDayMax(response.data.forecast.forecastday[0].day.maxtemp_c)
        setPlusOneDay(response.data.forecast.forecastday[1].date)
        setPlusOneDayMin(response.data.forecast.forecastday[1].day.mintemp_c)
        setPlusOneDayMax(response.data.forecast.forecastday[1].day.maxtemp_c)
        setPlusTwoDay(response.data.forecast.forecastday[2].date)
        setPlusTwoDayMin(response.data.forecast.forecastday[2].day.mintemp_c)
        setPlusTwoDayMax(response.data.forecast.forecastday[2].day.maxtemp_c)
        setLoading(false)
      }).catch(function (error) {
        console.error(error);
      });
   }

    var image;
    switch (text) {
      case 'Partly cloudy':
        image = require("../images/partly cloudy.png");
        break;
      case 'Sunny':
        image = require("../images/sunny.png");
        break;
      case 'Mist':
        image = require("../images/mist.png");
        break;
      case 'Moderate rain':
        image = require("../images/moderate rain.png");
        break;
      case 'Light snow':
        image = require("../images/light snow.png");
        break;
      case 'Overcast':
        image = require("../images/overcast.png");
        break;
      case 'Clear':
        image = require("../images/clear.png");
        break;
      case 'Light rain':
        image = require("../images/light rain.png");
        break;
      case 'Patchy light rain with thunder':
        image = require("../images/rain with thunder.png");
        break;
      default:
        image = require("../images/freezing fog.png");
    }

    let dewPoint = (temp) - [(100 - humidity)/5];

    var feelsLikeFootnote;
      if (feelsLike > temp) {
        feelsLikeFootnote = 'Humidity is making it feel warmer.'
      } else if (feelsLike < temp) {
        feelsLikeFootnote = 'Wind is making it feel colder.'
      } else if (feelsLike === temp) {
        feelsLikeFootnote = 'Similar to the actual temp.'
      }
    
    var visibilityFootnote;
      if (visibility <= 1) {
        visibilityFootnote = 'Fog is affecting visibility.'
      } else if (visibility > 1 && visibility <= 3) {
        visibilityFootnote = 'Light Fog is affecting visibility.'
      } else if (visibility > 3 && visibility <= 6) {
        visibilityFootnote = 'Haze is affecting visibility.'
      } else if (visibility > 6 && visibility <= 10) {
        visibilityFootnote = 'Light haze is affecting visibility.'
      } else {
        visibilityFootnote = `It's perfectly clear right now.`
      }

    var uvIndexMeter = uvIndex * 11;

    var uvIndexFootnote;
      if (uvIndex >= 1 && uvIndex <= 2) {
        uvIndexFootnote = 'No protection needed.'
      } else if (uvIndex >= 3 && uvIndex <= 5) {
        uvIndexFootnote = 'Some protection is required.'
      } else if (uvIndex >= 6 && uvIndex <= 7) {
        uvIndexFootnote = 'Protection is essential.'
      } else if (uvIndex >= 8 && uvIndex <= 10) {
        uvIndexFootnote = 'Extra protection is needed.'
      } else {
        uvIndexFootnote = 'Stay Inside!'
      }

    var pressureDegreeMeasure = 240 - [(pressure - 960) * 3];

  return (
    < >
        <input type="text" className={styles.input} name="input" placeholder='Enter City Name' onChange={handleChange}/>
        {place ? <div className={styles.card}>
          <div className={styles.leftBox}>
              <div className={styles.icon}>
                <img className={styles.iconImg} src={image} alt="a" />
              </div>
              {location && <div className={styles.location}>{location}</div>}
              {temp && <div className={styles.temp}>{temp.toFixed(0)}<span style={{fontSize: '43px', background: 'transparent'}}>&deg;C</span></div>}
              {text && <div className={styles.text}>{text}</div>}
          </div>
          <div className={styles.rightBox}>
              <div className={styles.item1}>
                <div className={styles.titles}><i className="fa-solid fa-up-down"/>&nbsp;Min/Max Temperature</div>
                <table style={{width: '94%', margin: '10px auto 0', background: 'transparent'}}>
                    <tr style={{lineHeight: '30px', background: 'transparent'}}>
                      <td style={{borderRight: '1px solid white', width: '20%', fontSize: '15px', fontWeight: '500', paddingLeft: '3px', background: 'transparent'}}>Min</td>
                      {zeroDayMin && <td style={{fontWeight: '500', textAlign: 'center', background: 'transparent'}}>{zeroDayMin.toFixed(0)}&deg;C</td>}
                      {plusOneDayMin && <td style={{fontWeight: '500', textAlign: 'center', background: 'transparent'}}>{plusOneDayMin.toFixed(0)}&deg;C</td>}
                      {plusTwoDayMin && <td style={{fontWeight: '500', textAlign: 'center', background: 'transparent'}}>{plusTwoDayMin.toFixed(0)}&deg;C</td>}
                    </tr>
                    <tr style={{lineHeight: '30px', background: 'transparent'}}>
                      <td style={{borderRight: '1px solid white', width: '20%', fontSize: '15px', fontWeight: '500', paddingLeft: '3px', background: 'transparent'}}>Max</td>
                      {zeroDayMax && <td style={{fontWeight: '500', textAlign: 'center', background: 'transparent'}}>{zeroDayMax.toFixed(0)}&deg;C</td>}
                      {plusOneDayMax && <td style={{fontWeight: '500', textAlign: 'center', background: 'transparent'}}>{plusOneDayMax.toFixed(0)}&deg;C</td>}
                      {plusTwoDayMax && <td style={{fontWeight: '500', textAlign: 'center', background: 'transparent'}}>{plusTwoDayMax.toFixed(0)}&deg;C</td>}
                    </tr>
                    <tr style={{borderTop: '1px solid white', lineHeight: '30px', background: 'transparent'}}>
                      <th style={{borderRight: '1px solid white', width: '20%', fontSize: '15px', fontWeight: '500', background: 'transparent'}}></th>
                      {zeroDay && <th style={{fontSize: '15px', fontWeight: '500', textAlign: 'center', background: 'transparent'}}>{zeroDay}</th>}
                      {plusOneDay && <th style={{fontSize: '15px', fontWeight: '500', textAlign: 'center', background: 'transparent'}}>{plusOneDay}</th>}
                      {plusTwoDay && <th style={{fontSize: '15px', fontWeight: '500', textAlign: 'center', background: 'transparent'}}>{plusTwoDay}</th>}
                    </tr>
                </table>
              </div>

              <div className={styles.item2}>
                <div className={styles.titles}><i className="fa-solid fa-wind" />&nbsp;Wind</div>
                <div className={styles.windDial}>
                  <img src={require('../images/dial.png')} alt='a' />
                </div>
                {windDire && <div className={styles.dialHand} style={{transform: `rotate(-${windDire}deg)`}}></div>}
                {windSpeed && <div className={styles.windSpeed}><strong>{windSpeed}</strong><br/>kph</div>}
              </div>

              <div className={styles.item2}>
                <div className={styles.titles}><i className="fa-solid fa-droplet" />&nbsp;Humidity</div>
                {humidity && <div className={styles.details}>{humidity}%</div>}
                <div className={styles.footnote}>The dew point is {dewPoint.toFixed(0)}&deg;C right now.</div>
              </div>
              <div className={styles.item2}>
                <div className={styles.titles}><i className="fa-solid fa-temperature-three-quarters"/>&nbsp;Feels Like</div>
                {feelsLike && <div className={styles.details}>{feelsLike.toFixed(0)}&deg;C</div>}
                <div className={styles.footnote}>{feelsLikeFootnote}</div>
              </div>

              <div className={styles.item2}>
                <div className={styles.titles}><i className="fa-solid fa-gauge"/>&nbsp;Pressure</div>
                <div className={styles.windDial}>
                  <img src={require('../images/pressure dial.png')} alt='a' />
                </div>
                {windDire && <div className={styles.dialHand} style={{transform: `rotate(-${pressureDegreeMeasure}deg)`}}></div>}
                {pressure && <div className={styles.pressureValue}><strong>{pressure}</strong><br/>hPa</div>}
              </div>

              <div className={styles.item2}>
                <div className={styles.titles}><i className="fa-solid fa-eye"/>&nbsp;Visibility</div>
                {visibility && <div className={styles.details}>{visibility} km</div>}
                <div className={styles.footnote}>{visibilityFootnote}</div>
              </div>

              <div className={styles.item2}>
                <div className={styles.titles}><i className="fa-solid fa-sun"/>&nbsp;UV Index</div>
                {uvIndex && <div className={styles.details}>{uvIndex}</div>}
                <div className={styles.uvScale}></div>
                <div className={styles.dot} style={{transform: `translateX(${uvIndexMeter}px)`}}></div>
                <div className={styles.footnote}>{uvIndexFootnote}</div>
              </div>

              <div className={styles.item2}>
                <div className={styles.titles}><i className="fa-solid fa-cloud-rain"/>&nbsp;Precipitation</div>
                {precip ? <div className={styles.details}>{precip} mm <br/><p className={styles.precipSubtext}>in last 24 hour</p></div> : <div className={styles.details}>0 mm <br/><p className={styles.precipSubtext}>in last 24 hour</p></div>}
              </div>
            </div>
          
        </div> : <UsingCoordinates/>}
    </>
  )
}


