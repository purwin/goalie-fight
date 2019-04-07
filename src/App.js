import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import Display from './components/Display';

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
        <Display 
          stats={this.state.stats}
        />
      </div>
    );
  }
}

export default App;
