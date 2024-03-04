import React from 'react'
import styles from '../styles/DetailsCard.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from './Spinner'

export default function DetailsCard(props) {
  
  const [location2, setLocation2] = useState('')
  const [temp2, setTemp2] = useState('')
  const [text2, setText2] = useState('')
  const [windDire2, setWindDire2] = useState('')
  const [windSpeed2, setWindSpeed2] = useState('')
  const [humidity2, setHumidity2] = useState('')
  const [feelsLike2, setFeelsLike2] = useState('')
  const [visibility2, setVisibility2] = useState('')
  const [uvIndex2, setUvIndex2] = useState('')
  const [precip2, setPrecip2] = useState('')
  const [pressure2, setPressure2] = useState('')
  const [zeroDay2, setZeroDay2] = useState('')
  const [plusOneDay2, setPlusOneDay2] = useState('')
  const [plusTwoDay2, setPlusTwoDay2] = useState('')
  const [zeroDayMin2, setZeroDayMin2] = useState('')
  const [zeroDayMax2, setZeroDayMax2] = useState('')
  const [plusOneDayMin2, setPlusOneDayMin2] = useState('')
  const [plusOneDayMax2, setPlusOneDayMax2] = useState('')
  const [plusTwoDayMin2, setPlusTwoDayMin2] = useState('')
  const [plusTwoDayMax2, setPlusTwoDayMax2] = useState('')

  const [coordinate , setcoordinate] = useState({ lati: 0, long: 0})
  const [loading, setLoading] = useState(false)
    
   useEffect(()=>{
    navigator.geolocation.getCurrentPosition(success);
   },[coordinate])
   
    function success(position) {
      const lati = position.coords.latitude;
      const long = position.coords.longitude;
      setcoordinate({ lati , long});
      getWeatherUsingCoordinates();
    }

    function getWeatherUsingCoordinates(){
      const options2 = {
        method: 'GET',
        url: `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${coordinate.lati},${coordinate.long}&days=4`,
        headers: {
          'X-RapidAPI-Key': '0c5925ba6dmsh60405270bba9b7dp1cb7b6jsnd92b421a77cb',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };

      setLoading(true)
      axios.request(options2).then(function (response) {
        setLocation2(response.data.location.name)
        setTemp2(response.data.current.temp_c)
        setText2(response.data.current.condition.text)
        setWindDire2(response.data.current.wind_degree)
        setWindSpeed2(response.data.current.wind_kph)
        setHumidity2(response.data.current.humidity)
        setFeelsLike2(response.data.current.feelslike_c)
        setVisibility2(response.data.current.vis_km)
        setUvIndex2(response.data.current.uv)
        setPrecip2(response.data.current.precip_mm)
        setPressure2(response.data.current.pressure_mb)
        setZeroDay2(response.data.forecast.forecastday[0].date)
        setZeroDayMin2(response.data.forecast.forecastday[0].day.mintemp_c)
        setZeroDayMax2(response.data.forecast.forecastday[0].day.maxtemp_c)
        setPlusOneDay2(response.data.forecast.forecastday[1].date)
        setPlusOneDayMin2(response.data.forecast.forecastday[1].day.mintemp_c)
        setPlusOneDayMax2(response.data.forecast.forecastday[1].day.maxtemp_c)
        setPlusTwoDay2(response.data.forecast.forecastday[2].date)
        setPlusTwoDayMin2(response.data.forecast.forecastday[2].day.mintemp_c)
        setPlusTwoDayMax2(response.data.forecast.forecastday[2].day.maxtemp_c)
        setLoading(false)
      }).catch(function (error) {
        console.error(error);
      });
    }

    var image;
    switch (text2) {
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

    let dewPoint = (temp2) - [(100 - humidity2)/5];

    var feelsLikeFootnote2;
      if (feelsLike2 > temp2) {
        feelsLikeFootnote2 = 'Humidity is making it feel warmer.'
      } else if (feelsLike2 < temp2) {
        feelsLikeFootnote2 = 'Wind is making it feel colder.'
      } else if (feelsLike2 === temp2) {
        feelsLikeFootnote2 = 'Similar to the actual temp.'
      }

      var visibilityFootnote2;
      if (visibility2 <= 1) {
        visibilityFootnote2 = 'Fog is affecting visibility.'
      } else if (visibility2 > 1 && visibility2 <= 3) {
        visibilityFootnote2 = 'Light Fog is affecting visibility.'
      } else if (visibility2 > 3 && visibility2 <= 6) {
        visibilityFootnote2 = 'Haze is affecting visibility.'
      } else if (visibility2 > 6 && visibility2 <= 10) {
        visibilityFootnote2 = 'Light haze is affecting visibility.'
      } else {
        visibilityFootnote2 = `It's perfectly clear right now.`
      }

    var uvIndexMeter2 = uvIndex2 * 11;

      var uvIndexFootnote2;
      if (uvIndex2 >= 1 && uvIndex2 <= 2) {
        uvIndexFootnote2 = 'No protection needed.'
      } else if (uvIndex2 >= 3 && uvIndex2 <= 5) {
        uvIndexFootnote2 = 'Some protection is required.'
      } else if (uvIndex2 >= 6 && uvIndex2 <= 7) {
        uvIndexFootnote2 = 'Protection is essential.'
      } else if (uvIndex2 >= 8 && uvIndex2 <= 10) {
        uvIndexFootnote2 = 'Extra protection is needed.'
      } else {
        uvIndexFootnote2 = 'Stay Inside!'
      }

    var pressureDegreeMeasure2 = 240 - [(pressure2 - 960) * 3];

  return (
    <>
        <div className={styles.card}>
          <div className={styles.leftBox}>
              <div className={styles.icon}>
                <img className={styles.iconImg} src={image} alt="a" />
              </div>
              {location2 && <div className={styles.location}>{location2}</div>}
              {temp2 && <div className={styles.temp}>{temp2.toFixed(0)}<span style={{fontSize: '43px', background: 'transparent'}}>&deg;C</span></div>}
              {text2 && <div className={styles.text}>{text2}</div>}
          </div>
          <div className={styles.rightBox}>
            {/* <div className={styles.row}> */}
              <div className={styles.item1}>
                <div className={styles.titles}><i className="fa-solid fa-up-down"/>&nbsp;Min/Max Temperature</div>
                <table style={{width: '94%', margin: '10px auto 0', background: 'transparent'}}>
                    <tr style={{lineHeight: '30px', background: 'transparent'}}>
                      <td style={{borderRight: '1px solid white', width: '20%', fontSize: '15px', fontWeight: '500', paddingLeft: '3px', background: 'transparent'}}>Min</td>
                      {zeroDayMin2 && <td style={{fontWeight: '500', textAlign: 'center', background: 'transparent'}}>{zeroDayMin2.toFixed(0)}&deg;C</td>}
                      {plusOneDayMin2 && <td style={{fontWeight: '500', textAlign: 'center', background: 'transparent'}}>{plusOneDayMin2.toFixed(0)}&deg;C</td>}
                      {plusTwoDayMin2 && <td style={{fontWeight: '500', textAlign: 'center', background: 'transparent'}}>{plusTwoDayMin2.toFixed(0)}&deg;C</td>}
                    </tr>
                    <tr style={{lineHeight: '30px', background: 'transparent'}}>
                      <td style={{borderRight: '1px solid white', width: '20%', fontSize: '15px', fontWeight: '500', paddingLeft: '3px', background: 'transparent'}}>Max</td>
                      {zeroDayMax2 && <td style={{fontWeight: '500', textAlign: 'center', background: 'transparent'}}>{zeroDayMax2.toFixed(0)}&deg;C</td>}
                      {plusOneDayMax2 && <td style={{fontWeight: '500', textAlign: 'center', background: 'transparent'}}>{plusOneDayMax2.toFixed(0)}&deg;C</td>}
                      {plusTwoDayMax2 && <td style={{fontWeight: '500', textAlign: 'center', background: 'transparent'}}>{plusTwoDayMax2.toFixed(0)}&deg;C</td>}
                    </tr>
                    <tr style={{borderTop: '1px solid white', lineHeight: '30px', background: 'transparent'}}>
                      <th style={{borderRight: '1px solid white', width: '20%', fontSize: '15px', fontWeight: '500', background: 'transparent'}}></th>
                      {zeroDay2 && <th style={{fontSize: '15px', fontWeight: '500', textAlign: 'center', background: 'transparent'}}>{zeroDay2}</th>}
                      {plusOneDay2 && <th style={{fontSize: '15px', fontWeight: '500', textAlign: 'center', background: 'transparent'}}>{plusOneDay2}</th>}
                      {plusTwoDay2 && <th style={{fontSize: '15px', fontWeight: '500', textAlign: 'center', background: 'transparent'}}>{plusTwoDay2}</th>}
                    </tr>
                </table>
              </div>

              <div className={styles.item2}>
                <div className={styles.titles}><i className="fa-solid fa-wind" />&nbsp;Wind</div>
                <div className={styles.windDial}>
                  <img src={require('../images/dial.png')} alt='a' />
                </div>
                {windDire2 && <div className={styles.dialHand} style={{transform: `rotate(-${windDire2}deg)`}}></div>}
                {windSpeed2 && <div className={styles.windSpeed}><strong>{windSpeed2}</strong><br/>kph</div>}
              </div>

              <div className={styles.item2}>
                <div className={styles.titles}><i className="fa-solid fa-droplet" />&nbsp;Humidity</div>
                {humidity2 && <div className={styles.details}>{humidity2}%</div>}
                <div className={styles.footnote}>The dew point is {dewPoint.toFixed(0)}&deg;C right now.</div>
              </div>
            {/* </div> */}

            {/* <div className={styles.row}> */}
              <div className={styles.item2}>
                <div className={styles.titles}><i className="fa-solid fa-temperature-three-quarters"/>&nbsp;Feels Like</div>
                {feelsLike2 && <div className={styles.details}>{feelsLike2.toFixed(0)}&deg;C</div>}
                <div className={styles.footnote}>{feelsLikeFootnote2}</div>
              </div>

              <div className={styles.item2}>
                <div className={styles.titles}><i className="fa-solid fa-gauge"/>&nbsp;Pressure</div>
                <div className={styles.windDial}>
                  <img src={require('../images/pressure dial.png')} alt='a' />
                </div>
                {windDire2 && <div className={styles.dialHand} style={{transform: `rotate(-${pressureDegreeMeasure2}deg)`}}></div>}
                {pressure2 && <div className={styles.pressureValue}><strong>{pressure2}</strong><br/>hPa</div>}
              </div>

              <div className={styles.item2}>
                <div className={styles.titles}><i className="fa-solid fa-eye"/>&nbsp;Visibility</div>
                {visibility2 && <div className={styles.details}>{visibility2} km</div>}
                <div className={styles.footnote}>{visibilityFootnote2}</div>
              </div>

              <div className={styles.item2}>
                <div className={styles.titles}><i className="fa-solid fa-sun"/>&nbsp;UV Index</div>
                {uvIndex2 && <div className={styles.details}>{uvIndex2}</div>}
                <div className={styles.uvScale}></div>
                <div className={styles.dot} style={{transform: `translateX(${uvIndexMeter2}px)`}}></div>
                <div className={styles.footnote}>{uvIndexFootnote2}</div>
              </div>

              <div className={styles.item2}>
                <div className={styles.titles}><i className="fa-solid fa-cloud-rain"/>&nbsp;Precipitation</div>
                {precip2 ? <div className={styles.details}>{precip2} mm <br/><p className={styles.precipSubtext}>in last 24 hour</p></div> : <div className={styles.details}>0 mm <br/><p className={styles.precipSubtext}>in last 24 hour</p></div>}
              </div>
            {/* </div> */}
          </div>
        </div>
    </>
  )
}


