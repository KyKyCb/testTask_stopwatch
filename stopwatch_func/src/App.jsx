
import React, {useState, useEffect } from 'react';
import './App.css';
import { Observable } from 'rxjs';

function App() {

  const stopwatch = {
    seconds: 0,
    minutes: 0,
    hours: 0,
    isInProgress: false,}

  const [time, setTime] = useState(stopwatch)
  const [Obs, setObs] = useState(null)

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
  }, [time.seconds, time.minutes, time.hours])


  const observable = new Observable (observer => {
    let subscribeId = setInterval(()=>observer.next(1), 1000)
    return {
      unsubscribe() {
        clearInterval(subscribeId);
      }}
  })

  function incrementSeconds (value) {
    setTime((prevTime)=> { 
      return {...prevTime, 
              seconds: prevTime.seconds + value,}})
  }
    
  function startStopwatch(){
    setTime((prevTime)=> { 
      return {...prevTime, 
              isInProgress: true}})
    const ObsHandler = observable.subscribe({
      next: value => incrementSeconds(value),
    })
    setObs(ObsHandler)      
  }
    
  function stopStopwatch(){
    setTime({...stopwatch})
    Obs.unsubscribe()      
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
      Obs.unsubscribe()
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
    <div className="clock">
      <h1>
      <span>{(time.hours < 10) ? `0${hours}` : hours}</span>:
      <span>{(time.minutes < 10) ? `0${minutes}` : minutes}</span>:
      <span>{(time.seconds < 10) ? `0${seconds}` : seconds} </span>
        </h1>
      <button onClick = {timerHandler} className = 'button'>{(time.isInProgress) ? 'stop' : 'start'}</button>
      <button onDoubleClick = {pauseStopwatch} className = 'button'>Pause</button>
      <button onClick = {resetStopwatch} className = 'button'>Reset</button> 
    </div>)
}

export default App;
