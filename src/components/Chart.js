import React from 'react';

const Chart = ({stats}) => {

    return(
      <div className="chart box">
        <h1>{stats.sv}</h1>
      </div>
    );
}

export default Chart;