import React from 'react'

import Chart from './Chart'
import Filters from './Filters'
import GoalieSelectors from './GoalieSelectors'

const GoalieView = ({stats, goalies, goalieList, time, situation, changeGoalie, addGoalie, pullGoalie}) => {

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
        changeGoalie={changeGoalie}
        addGoalie={addGoalie}
        pullGoalie={pullGoalie}
      />
    </div>
  )
};

export default GoalieView