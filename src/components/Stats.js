import React from 'react'
import styled from 'styled-components'

import Box from './elements/Box'

const GoalieStat = styled.div`
  margin: 1rem;
  padding: 0 0 1rem 0;
  border-bottom: 3px solid #80B8FF;
`;

const GoalieName = styled.h3`
  text-align: left;
  font-size: 1.5rem;
  margin: .5rem 0;
`;

const StatTable = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  overflow-x:auto;

  & th {
    color: #0066E5;
    font-weight: 400;
  }

  & tbody tr:hover {
    background: #B3D5FF;
  }

  & th:nth-child(1) {
    padding-left: .5rem;
  }

  & th:nth-child(3),
  & td:nth-child(3) {
    text-align: right;
    padding-right: .5rem;
  }
`;

const TableRowSpace = styled.tr`
  & * {
    padding-top: 1rem;
  }
`;

const Stats = ({stats}) => {
  console.log(stats);

  return(
    <Box title={`Stats`}>
      <div className="box-body">
      {stats.map((goalie, i) => {
        if (goalie.name) {
          return(
            <GoalieStat key={i}>
              <GoalieName>{goalie.name} ({goalie.team})</GoalieName>
              <StatTable>
                <thead>
                  <tr>
                    <th></th>
                    <th>Value</th>
                    <th>Rank</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>GP</th>
                    <td>{goalie.gp}</td>
                    <td>{goalie.p_gp.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th>TOI</th>
                    <td>{goalie.toi.toFixed(2)}</td>
                    <td>{goalie.p_toi.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th>SHOTS</th>
                    <td>{goalie.sa}</td>
                    <td>{goalie.p_sa.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th>SHOTS/60</th>
                    <td>{(goalie.sa / goalie.toi * 60).toFixed(3)}</td>
                    <td>{goalie.p_sa.toFixed(2)}</td>
                  </tr>
                  <TableRowSpace>
                    <th>&#x2004;&#x2004;SV%</th>
                    <td>{goalie.sv.toFixed(3)}</td>
                    <td>{goalie.p_sv.toFixed(2)}</td>
                  </TableRowSpace>
                  <tr>
                    <th>xSV%</th>
                    <td>{goalie.xsv.toFixed(3)}</td>
                    <td>{goalie.p_xsv.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th>dSV%</th>
                    <td>{goalie.dsv.toFixed(3)}</td>
                    <td>{goalie.p_dsv.toFixed(2)}</td>
                  </tr>
                  <TableRowSpace>
                    <th>GSAA</th>
                    <td>{goalie.gsaa.toFixed(3)}</td>
                    <td>{goalie.p_gsaa.toFixed(2)}</td>
                  </TableRowSpace>
                  <tr>
                    <th>GSAA/60</th>
                    <td>{goalie.gsaa60.toFixed(3)}</td>
                    <td>{goalie.p_gsaa60.toFixed(2)}</td>
                  </tr>
                  <TableRowSpace>
                    <th>HDSV%</th>
                    <td>{goalie.hdsv.toFixed(3)}</td>
                    <td>{goalie.p_hdsv.toFixed(2)}</td>
                  </TableRowSpace>
                  <tr>
                    <th>HDGSAA</th>
                    <td>{goalie.hdgsaa.toFixed(3)}</td>
                    <td>{goalie.p_hdgsaa.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th>HDGSAA/60</th>
                    <td>{goalie.hdgsaa60.toFixed(3)}</td>
                    <td>{goalie.p_hdgsaa60.toFixed(2)}</td>
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