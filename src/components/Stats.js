import React from 'react'
import styled from 'styled-components'

import Box from './elements/Box'

const GoalieName = styled.h3`
  text-align: left;
  font-size: 1.5rem;
  margin: .5rem 0;
`;

const StatTable = styled.table`
  width: 100%;
  text-align: left;
`;

const GoalieStat = styled.div`
  margin: 1rem;
  padding: 0 0 1rem 0;
  border-bottom: 3px solid #80B8FF;
`;

const Stats = ({stats}) => {
  console.log(stats);

  return(
    <Box title={`Stats`}>
      <div className="box-body">
      {stats.map(goalie => {
        if (goalie.name) {
          return(
            <GoalieStat>
              <GoalieName>{goalie.name} ({goalie.team})</GoalieName>
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
                    <td>GP</td>
                    <td>{goalie.gp}</td>
                    <td>{goalie.p_gp.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>TOI</td>
                    <td>{goalie.toi.toFixed(2)}</td>
                    <td>{goalie.p_toi.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>SHOTS</td>
                    <td>{goalie.sa}</td>
                    <td>{goalie.p_sa.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>SV%</td>
                    <td>{goalie.sv.toFixed(3)}</td>
                    <td>{goalie.p_sv.toFixed(2)}</td>
                  </tr>
                </tbody>
              </StatTable>
            </GoalieStat>
          )
        }

        return false;
      })}
      </div>
    </Box>
  );
};

export default Stats