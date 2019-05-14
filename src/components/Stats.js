import React from 'react'
import styled from 'styled-components'
import AnimateHeight from 'react-animate-height';

import Box from './elements/Box'
import StatsTable from './elements/StatsTable'

const GoalieStat = styled.div`
  margin: 0 1rem;
  padding: 0;
  border-bottom: 3px solid #80B8FF;
`;

const GoalieName = styled.h3`
  text-align: left;
  font-size: 1.5rem;
  margin: .5rem 0;
  color: ${props => props.color || 'inherit'}
  cursor: pointer;
`;

const BoxBody = styled.div`
  margin: 1rem 0;
  background: #E5F1FF;
  overflow: scroll;
`;


const Stats = ({stats, rankTotal, activeGoalie, setActiveGoalie, colors, ...props}) => {
    // Function that sets state.activeGoalie
    const onSelectGoalie = goalie => {
    setActiveGoalie(goalie)
  }

  return(
    <Box title={`STATS`}>
      <BoxBody>
      {stats.map((goalie, i) => {
        if (goalie.name) {
          return(
            <GoalieStat key={i}>
              <GoalieName
                color={colors[i % colors.length]}
                onClick={() => onSelectGoalie(goalie)}
              >
                {goalie.name} ({goalie.team})
              </GoalieName>
              <AnimateHeight
                duration={300}
                height={`${goalie.id}_${goalie.team}` === activeGoalie ? 'auto' : 0 }
              >
                <StatsTable
                  goalie={goalie}
                  rankTotal={rankTotal}
                />
              </AnimateHeight>
            </GoalieStat>
          )
        }

        return false;
      })}
      </BoxBody>
    </Box>
  );
};

export default Stats