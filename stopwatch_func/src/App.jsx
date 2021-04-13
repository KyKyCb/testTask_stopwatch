
import React, {useState, useEffect } from 'react';
import './App.css';



function App() {

  const stopwatch = {
    seconds: 0,
    minutes: 0,
    hours: 0,
    isInProgress: false,}

  

  const [time, setTime] = useState(stopwatch)
  const [intervalID, setIntervalId] = useState(null)

  

  useEffect(()=>{

    if(time.seconds === 60){
      setTime((prevTime) => {
      return {...prevTime, 
        minutes: prevTime.minutes + 1,
        seconds: 0}
      })
    }

    if(time.minutes === 60){
      setTime((prevTime) => {
      return {...prevTime, 
        hours: prevTime.hours + 1,
        minutes: 0}
      })  
    }

    if(time.hours === 24){
      setTime((prevTime) => {
      return {...prevTime, 
        seconds: 0, 
        minutes: 0, 
        hours: 0,}
      })
    }
  })

  function incrementSeconds () {
    setTime((prevTime) =>  
      {  
        return {...prevTime, seconds: prevTime.seconds + 1}  
      })
    
    }

  function startStopwatch(){
      setTime((prevTime) =>  
      {  
        return {...prevTime, isInProgress: true,}  
      })
      const interval = setInterval(incrementSeconds, 1000)
      setIntervalId(interval)
    }

  function stopStopwatch(){
    clearInterval(intervalID)
    setTime({...stopwatch})
  }

  function timerHandler(){
    if(!time.isInProgress){
      startStopwatch()
    }
    if(time.isInProgress){
      stopStopwatch()
    }
  }

  function pauseStopwatch(){
    if(!time.isInProgress){
      startStopwatch()
    }
    if(time.isInProgress){
      setTime((prevTime) => 
      {
        return {...prevTime, isInProgress: false,}
      })
      clearInterval(intervalID)
    }
  }
 
  function resetStopwatch(){
    setTime((prevTime) => 
    {
      return {...prevTime, 
        seconds: 0, 
        minutes: 0, 
        hours: 0,}
    })
  }


    const seconds = time.seconds;
    const minutes = time.minutes;
    const hours = time.hours; 

    return (
      <div className="App">
        <h1>          
          {(time.hours < 10) ? `0${hours}` : hours}:
          {(time.minutes < 10) ? `0${minutes}` : minutes}:
          {(time.seconds < 10) ? `0${seconds}` : seconds} 
          </h1>
        <button onClick = {timerHandler}>Start/Stop</button>
        <button onDoubleClick = {pauseStopwatch}>Pause</button>
        <button onClick = {resetStopwatch}>Reset</button> 
      </div>)
}

export default App;
