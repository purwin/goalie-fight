import React from 'react';

import Chart from './Chart';
import Filters from './Filters';
import GoaliePicker from './GoaliePicker';

const GoalieView = ({stats}) => {

    return(
      <>
        <Filters />
        <Chart
          stats={stats}
        />
        <GoaliePicker />
      </>
    );
}

export default GoalieView;