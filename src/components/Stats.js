import React from 'react';

const Stats = ({stats}) => {
  console.log(Object.values(stats));
    return (
      <div className="box">
        <div className="box-head">
          <h3>AVERAGES</h3>
        </div>
        <div className="box-body">
          <ul>
            {Object.values(stats).map((stat, index) => (
              <li key={index}>{stat}</li>
            ))}
          </ul>
        </div>
      </div>
    );
}

export default Stats;