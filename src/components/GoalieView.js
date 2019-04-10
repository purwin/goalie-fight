import React from 'react'

import Chart from './Chart'
import Filters from './Filters'
import GoalieSelectors from './GoalieSelectors'

const GoalieView = ({stats, goalies, goalieList, time, situation}) => {

  return(
    <div>
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
      />
    </div>
  )
};

export default GoalieView