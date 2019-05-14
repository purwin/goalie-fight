import React from 'react'
import styled from 'styled-components'

import Chart from './Chart'
import Filters from './Filters'
import GoalieSelectors from './GoalieSelectors'

import Box from './elements/Box'

const ViewBox = styled(Box)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 1rem;
  background: none;
  color: #4C9CFF;
  height: 100%;
  align-content: start;
`;

const GoalieView = ({stats, goalies, goalieList, time, situation, changeGoalie, setActiveGoalie, addGoalie, pullGoalie, setSituation, resetState, colors, ...props}) => {

  return(
    <ViewBox>
      <Filters
        time={time}
        situation={situation}
        setSituation={setSituation}
        resetState={resetState}
      />
      <Chart
        stats={stats}
      />
      <GoalieSelectors
        goalies={goalies}
        goalieList={goalieList}
        changeGoalie={changeGoalie}
        setActiveGoalie={setActiveGoalie}
        addGoalie={addGoalie}
        pullGoalie={pullGoalie}
        colors={colors}
      />
    </ViewBox>
  )
};

export default GoalieView