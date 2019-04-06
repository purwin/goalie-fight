import React, { Component } from 'react';

class Comparables extends Component {
  render() {
    return (
      <div className="box">
        <div className="box-head">
          <h3>Comparables</h3>
        </div>
        <div className="box-body">
          <ul>
            <li>
              <div>Comparable 1</div>
              <div>XX%</div>
            </li>
            <li>
              <div>Comparable 2</div>
              <div>XX%</div>
            </li>
            <li>
              <div>Comparable 3</div>
              <div>XX%</div>
            </li>
            <li>
              <div>Comparable 4</div>
              <div>XX%</div>
            </li>
            <li>
              <div>Comparable 5</div>
              <div>XX%</div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Comparables;