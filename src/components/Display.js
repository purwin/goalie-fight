import React from 'react';

import Comparables from './Comparables';
import Stats from './Stats';
import GoalieView from './GoalieView';

const Display = ({stats}) => {

    return(
      <>
        {/* <Stats
          stats={stats}
        /> */}
        <GoalieView
          stats={stats}
        />
        {/* <Comparables /> */}
      </>
    );
}

export default Display;