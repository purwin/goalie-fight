import React from 'react';

import Chart from './Chart';
import Filters from './Filters';

const GoalieView = ({stats}) => {

    return(
      <>
        <Filters />
        <Chart
          stats={stats}
        />
      </>
    );
}

export default GoalieView;