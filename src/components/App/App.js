import React, { Component } from 'react';
import './App.css';
import Slider from '../Slider/Slider';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Slider duration={1000}>
          <div background='blue'></div>
          <div background='red'></div>
          <div background='yellow'></div >
          <div background='teal'></div >
        </Slider >
      </div >
    );
  }
}

export default App;
