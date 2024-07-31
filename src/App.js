import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import './App.css';
function App() {
  //initialise as empty obj  ect 
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  // passing the dynamic location enterd by user into api ${location}n

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=99f3c8e641e164b1927e75278e68f63b`

  const searchLoaction = (event) => {
    if (event.key === 'Enter') {
      setLoading(true);

      setTimeout(() => {

        axios.get(url)
          .then((response) => {
            setData(response.data);
            console.log(response.data);
            setLocation('')
          })
          .catch((err) => {
            console.log("error in location", err);
          })
          .finally(() => {
            setLoading(false);
          })

      }, 2000)

    }

  }
  return (
    <div className='container '   >
      {/* having input feild to take city name  */}
      <div className='search mb-8 pa-2 mt-5'>
        <input
          type="text"
          className=''
          placeholder='Enter City'
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLoaction}
        ></input>
      </div>


      {loading
        ? (
          <div className='container-sub  mt-10'>
            <div className='skeleton skeleton-text t1 text-xl'></div>
            <div className='skeleton skeleton-text  t2'></div>
            <div className='skeleton skeleton-text t1'></div>
            <div className='skeleton skeleton-text t3'></div>
          </div>
        ) : (
          <>
            <div className='container-sub'  >
              <div className='top'>
                <div className='location text-xl'>
                  <p>{data.name}</p>
                  <div className='location-temp'>

                    {/* check if temp is there  */}
                    {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
                  </div>
                  <div className='description'>
                    {data.weather ? <p>{data.weather[0].main}</p> : null}
                  </div>
                </div>
              </div>
              {/* bottom part  */}
              {data.name !== undefined &&
                <div className='bottom grid  sm:grid-cols-3  grid-cols-1 gap-4 p-4'>
                  <div className='feels text-sm  flex flex-col items-center justify-center rounded-md bg-[#d2cece]'>
                    {data.main ? <p>{data.main.feels_like.toFixed()}°C</p> : null}
                    <p className='bold'>Feels like</p>
                  </div>
                  <div className='humidity text-sm flex flex-col items-center justify-center rounded-md bg-[#d2cece]'>
                    {data.main ? <p >{data.main.humidity}%</p> : null}
                    <p className='bold'>Humidity</p>
                  </div>
                  <div className='wind text-sm flex flex-col items-center justify-center rounded-md bg-[#d2cece]'>
                    {data.wind ? <p>{data.wind.speed.toFixed()} Km/h</p> : null}
                    <p className='bold'>Wind</p>
                  </div>
                </div>
              }

            </div>
          </>
        )
      }



      {/* CITY DATA BOX */}


    </div>

  );
}

export default App;
