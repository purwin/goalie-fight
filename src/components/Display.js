import React from 'react'

import Comparables from './Comparables'
import Stats from './Stats'
import GoalieView from './GoalieView'

const Display = ({stats, goalies, goalieList, time, situation}) => {

  return(
    <>
      {/* <Stats
        stats={stats}
      /> */}
      <GoalieView
        stats={stats}
        goalies={goalies}
        goalieList={goalieList}
        time={time}
        situation={situation}
      />
      {/* <Comparables /> */}
    </>
  )
};

export default Display