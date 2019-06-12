import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import AnimateHeight from 'react-animate-height';

import Box from './elements/Box'
import StatsTable from './elements/StatsTable'

const StatsBox = styled(Box)`
  height: 100%;
`;

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

  &:hover {
    color: ${props => darken(0.05, props.color) || 'inherit'}
  }
`;

const BoxBody = styled.div`
  margin: 0 0 1rem 0;
  background: #E5F1FF;
  overflow: auto;
`;


const Stats = ({stats, rankTotal, activeGoalie, setActiveGoalie, colors, ...props}) => {
    // Function that sets state.activeGoalie
    const onSelectGoalie = index => {
    setActiveGoalie(index)
  }

  return(
    <StatsBox title={`STATS`}>
      <BoxBody>
          {stats.map((goalie, i) => {
            if (goalie.name) {
              return(
                <GoalieStat key={`stat_${i}`}>
                  <GoalieName
                    color={colors[i % colors.length]}
                    onClick={() => onSelectGoalie(i)}
                  >
                    {goalie.name} ({goalie.team})
                  </GoalieName>
                  <AnimateHeight
                    duration={300}
                    height={i === activeGoalie ? 'auto' : 0 }
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
    </StatsBox>
  );
};

export default Stats