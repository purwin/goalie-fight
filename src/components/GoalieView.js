import React from 'react'
import styled from 'styled-components'

import Chart from './Chart'
import Filters from './Filters'
import GoalieSelectors from './GoalieSelectors'

import Box from './elements/Box'

const ViewBox = styled(Box)`
  width: 50%;
  background: #E5F1FF;
  color: #4C9CFF;
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