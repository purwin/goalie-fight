import React from 'react'

import FilterButton from './elements/FilterButton'

const Filters = ({time, situation}) => {
  const timeFilters = [`2019`, `CAREER`];
  const situationFilters = [`EVENS`, `PK`, `ALL`];

  return(
    <div className="filters">
      <div className="time">
      {timeFilters.map((filter, i) => (
        <FilterButton
          key={i}
          active={time === filter}
          label={filter}
        />
      ))}
      </div>
      <div className="situation">
        {situationFilters.map((filter, i) => (
          <FilterButton
            key={i}
            active={situation === filter}
            label={filter}
          />
        ))}
      </div>
      <div className="reset">
        <FilterButton
          label={`RESET`}
        />
      </div>
    </div>
  )
};

export default Filters