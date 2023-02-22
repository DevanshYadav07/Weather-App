import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import './App.css';
function App() {
  //initialise as empty obj  ect 
  const [data,setData]=useState({});
  const [location,setLocation]=useState('');
  // passing the dynamic location enterd by user into api ${location}n

   const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=99f3c8e641e164b1927e75278e68f63b`

   const searchLoaction=(event)=>
   {
    if(event.key==='Enter')
    {
      axios.get(url).then((response)=>{
        setData(response.data);
        console.log(response.data);
        setLocation('')
      })

    }

   }
  return (
    <div className='app'>
      {/* having input feild to take city name  */}
      <div className='search'>
        <input 
        type="text"
         placeholder='Enter City'
         value={location}
         onChange={event=>setLocation(event.target.value)}
         onKeyPress={searchLoaction}
        ></input>
         </div>
      <div className='container'>
      <div className='top'>
        <div className='location'>
          <p>{data.name}</p>
          <div className='location-temp'>

            {/* check if temp is there  */}
           {data.main? <h1>{data.main.temp.toFixed()} °C</h1> : null}
          </div>
          <div className='description'> 
          {data.weather?<p>{data.weather[0].main}</p>:null}
          </div>
        </div>
      </div>
      {/* bottom part  */}

      {data.name!==undefined &&
        <div className='bottom'>
        <div className='feels'>
          {data.main?<p>{data.main.feels_like.toFixed()}°C</p>:null}
          <p className='bold'>Feels like</p>
        </div>
        <div className='humidity'>
        {data.main?<p>{data.main.humidity}%</p>:null}
        <p className='bold'>humidity</p>
        </div>
        <div className='wind'>
        {data.wind?<p>{data.wind.speed.toFixed()}Km/h</p>:null}
          <p className='bold'>Wind</p>
        </div>
      </div>}
    



      </div>
    </div>
    
  );
}

export default App;
