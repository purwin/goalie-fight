import React, { Component } from 'react';

class Filters extends Component {
  render() {
    return(
      <div className="filters">
        <button>2019</button>
        <button>Career</button>
        <button>ALL</button>
        <button>5v5</button>
        <button>PK</button>
        <button>RESET</button>
      </div>
    );
  }
}

export default Filters;