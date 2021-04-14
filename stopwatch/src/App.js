
import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      seconds: 0,
      minutes: 0,
      hours: 0,
      isInProgress: false,
    }

    this.startStopwatch = this.startStopwatch.bind(this)
    this.stopStopwatch = this.stopStopwatch.bind(this)
    this.timerHandler = this.timerHandler.bind(this)
    this.pauseStopwatch = this.pauseStopwatch.bind(this)
    this.resetStopwatch = this.resetStopwatch.bind(this)
  }

  componentDidUpdate(){
    if(this.state.seconds === 60){
      this.setState({minutes: this.state.minutes +1,
        seconds: 0,})}
    if(this.state.minutes === 60){
      this.setState({hours: this.state.hours +1,
        minutes: 0,})}
    if(this.state.hours === 24){
      this.setState({
        seconds: 0,
        minutes: 0,
        hours: 0,
      })}
  }

  startStopwatch(){
      this.setState({isInProgress: true,});
      this.interval = setInterval(()=>this.setState({seconds: this.state.seconds +1,}), 1000);
  }
  
  stopStopwatch(){
      this.setState({
        seconds: 0,
        minutes: 0,
        hours: 0,
        isInProgress: false,
      })
      clearInterval(this.interval)
  }

  timerHandler(){
    if(!this.state.isInProgress){
      this.startStopwatch()
    }
    if(this.state.isInProgress){
      this.stopStopwatch()
    }
  }

  pauseStopwatch(){
    if(!this.state.isInProgress){
      this.startStopwatch()
    }
    if(this.state.isInProgress){
      this.setState({isInProgress: false,})
      clearInterval(this.interval)
    }
  }

  resetStopwatch(){
    this.setState({
      seconds: 0,
      minutes: 0,
      hours: 0,
    })
  }

  render() {
    const seconds = this.state.seconds;
    const minutes = this.state.minutes;
    const hours = this.state.hours;
  
    return (
      <div className="clock">
        <h1>
          <span>{(this.state.hours < 10) ? `0${hours}` : hours}</span>:
          <span>{(this.state.minutes < 10) ? `0${minutes}` : minutes}</span>:
          <span>{(this.state.seconds < 10) ? `0${seconds}` : seconds} </span>
        </h1>

        <button onClick = {this.timerHandler} className = 'button'>{(this.state.isInProgress) ? 'stop' : 'start'}</button>
        <button onDoubleClick = {this.pauseStopwatch} className = 'button'>Pause</button>
        <button onClick = {this.resetStopwatch} className = 'button'>Reset</button>
      </div>)
  }
}

export default App;
