import React, { Component } from 'react';
import Slider from '../Slider/Slider';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Slider duration={1000}>
          <div background='blue'>
            <h1>I AM SLIDE !!</h1>
          </div>
          <div background='red'>
            <h1>I AM SLIDE 2!</h1>
          </div>
          <div background='yellow'>
            <h1>I AM SLIDE 3!</h1>
          </div >
          <div background='teal'>
            <h1>I AM SLIDE 4!</h1>
          </div >
        </Slider >
      </div >
    );
  }
}

export default App;
