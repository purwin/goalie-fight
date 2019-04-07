import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import GoalieView from './components/GoalieView';
import Comparables from './components/Comparables';
import Stats from './components/Stats';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: {
        gsaa: 95,
        sv: 92.1,
        xsv: 91.8,
        hdsv: 88.78,
        w: 22
      }
    };
  }

  render() {
    return (
      <div className="App">
        <Header />
        {/* <Stats 
          stats={this.state.stats}
        /> */}
        <GoalieView 
          stats={this.state.stats}
        />
        {/* <Comparables /> */}
      </div>
    );
  }
}

export default App;
