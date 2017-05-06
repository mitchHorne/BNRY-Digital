import React, { Component } from 'react';
import './App.css';
import Slider from '../Slider/Slider';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Slider>
          <div background='blue'></div>
          <div background='red'></div>
          <div background='yellow'></div >
          <div background='black'></div >
        </Slider >
      </div >
    );
  }
}

export default App;
