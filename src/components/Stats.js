import React from 'react'
import styled from 'styled-components'

import Box from './elements/Box'

const StatTable = styled.table`
  width: 100%;
  padding: .5rem;
  text-align: left;
`;

const Stats = ({stats}) => {
  console.log(stats);

  return(
    <Box title={`Stats`}>
      <div className="box-body">
      {stats.map(goalie => {
        if (goalie.name) {
          return(
            <div>
              <h3>{goalie.name} ({goalie.team})</h3>
              <StatTable>
                <thead>
                  <tr>
                    <td></td>
                    <td>Value</td>
                    <td>Rank</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SV%</td>
                    <td>{goalie.sv.toFixed(3)}</td>
                    <td>{goalie.p_sv}</td>
                  </tr>
                </tbody>
              </StatTable>
            </div>
          )
        }

        return false;
      })}
      </div>
    </Box>
  );
};

export default Stats