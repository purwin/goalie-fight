import React from 'react'

import Box from './elements/Box'

const Stats = ({stats}) => {
  console.log(Object.values(stats));

  return(
    <Box title={`Averages`}>
      <div className="box-body">
        <ul>
          {Object.values(stats).map((stat, index) => (
            <li key={index}>{stat}</li>
          ))}
        </ul>
      </div>
    </Box>
  );
};

export default Stats