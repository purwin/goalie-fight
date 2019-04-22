import React from 'react'
import styled from 'styled-components'

import Chart from './Chart'
import Filters from './Filters'
import GoalieSelectors from './GoalieSelectors'

import Box from './elements/Box'

const ViewBox = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 1rem;
  background: none;
  color: #4C9CFF;
  height: 100%;
  align-content: start;
`;

const GoalieView = ({stats, goalies, goalieList, time, situation, changeGoalie, addGoalie, pullGoalie}) => {

  return(
    <ViewBox>
      <Filters
        time={time}
        situation={situation}
      />
      <Chart
        stats={stats}
      />
      <GoalieSelectors
        goalies={goalies}
        goalieList={goalieList}
        changeGoalie={changeGoalie}
        addGoalie={addGoalie}
        pullGoalie={pullGoalie}
      />
    </ViewBox>
  )
};

export default GoalieView