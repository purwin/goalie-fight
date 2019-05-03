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
  color: ${props => props.color || "inherit"}
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

const colors = [
  `#E8C0A0`,
  `#F47560`,
  `#F1E05C`,
  `#E7A838`,
  `#61CDBB`,
  `#98E2D5`,
];

const Stats = ({stats, rankTotal, ...props}) => {
  return(
    <Box title={`STATS`}>
      <div className="box-body">
      {stats.map((goalie, i) => {
        if (goalie.name) {
          return(
            <GoalieStat key={i}>
              <GoalieName
                color={colors[i % colors.length]}
              >
                {goalie.name} ({goalie.team})
              </GoalieName>
              <StatTable>
                <thead>
                  <tr>
                    <th></th>
                    <th>Value</th>
                    <th>Rank/{rankTotal}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>GP</th>
                    <td>{goalie.stats.gp}</td>
                    <td>{goalie.rank.r_gp}</td>
                  </tr>
                  <tr>
                    <th>TOI</th>
                    <td>{parseInt(goalie.stats.toi)}:{(`0` + parseInt((goalie.stats.toi - parseInt(goalie.stats.toi)) * 60)).slice(-2)}</td>
                    <td>{goalie.rank.r_toi}</td>
                  </tr>
                  <tr>
                    <th>SHOTS</th>
                    <td>{goalie.stats.sa}</td>
                    <td>{goalie.rank.r_sa}</td>
                  </tr>
                  <tr>
                    <th>SHOTS/60</th>
                    <td>{(goalie.stats.sa / goalie.stats.toi * 60).toFixed(3)}</td>
                    <td>{goalie.rank.r_sa}</td>
                  </tr>
                  <TableRowSpace>
                    <th>&#x2004;&#x2004;SV%</th>
                    <td>{goalie.stats.sv.toFixed(3)}</td>
                    <td>{goalie.rank.r_sv}</td>
                  </TableRowSpace>
                  <tr>
                    <th>xSV%</th>
                    <td>{goalie.stats.xsv.toFixed(3)}</td>
                    <td>{goalie.rank.r_xsv}</td>
                  </tr>
                  <tr>
                    <th>dSV%</th>
                    <td>{goalie.stats.dsv.toFixed(3)}</td>
                    <td>{goalie.rank.r_dsv}</td>
                  </tr>
                  <TableRowSpace>
                    <th>GSAA</th>
                    <td>{goalie.stats.gsaa.toFixed(3)}</td>
                    <td>{goalie.rank.r_gsaa}</td>
                  </TableRowSpace>
                  <tr>
                    <th>GSAA/60</th>
                    <td>{goalie.stats.gsaa60.toFixed(3)}</td>
                    <td>{goalie.rank.r_gsaa60}</td>
                  </tr>
                  <TableRowSpace>
                    <th>HDSV%</th>
                    <td>{goalie.stats.hdsv.toFixed(3)}</td>
                    <td>{goalie.rank.r_hdsv}</td>
                  </TableRowSpace>
                  <tr>
                    <th>HDGSAA</th>
                    <td>{goalie.stats.hdgsaa.toFixed(3)}</td>
                    <td>{goalie.rank.r_hdgsaa}</td>
                  </tr>
                  <tr>
                    <th>HDGSAA/60</th>
                    <td>{goalie.stats.hdgsaa60.toFixed(3)}</td>
                    <td>{goalie.rank.r_hdgsaa60}</td>
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