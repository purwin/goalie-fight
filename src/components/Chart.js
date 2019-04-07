import React from 'react';

const Chart = ({stats}) => {
  const statArray = Object.entries(stats);

    return(
      <div className="chart box">
        <ul>
          {
            statArray.map((item) => (
              <li key={item[0]}>{item[1]}</li>
            ))
          }
        </ul>
      </div>
    );
}

export default Chart;