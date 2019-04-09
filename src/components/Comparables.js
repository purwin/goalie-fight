import React, { Component } from 'react';

import Box from './elements/Box';

class Comparables extends Component {
  render() {
    return (
      <Box title={`Comparables`}>
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
      </Box>
    );
  }
}

export default Comparables;