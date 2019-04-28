import React from 'react'
import styled from 'styled-components'

import FilterButton from './elements/FilterButton'

const FiltersDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: yellow;
  color: aquamarine;
`;

const Filters = ({time, situation, setSituation}) => {
  const timeFilters = [`2017–18`, `2018–19`];
  const situationFilters = [`EVENS`, `5v5`, `PK`, `4v5`, `ALL`];

  return(
    <FiltersDiv>
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
            buttonClick={e => setSituation(e.target.innerText)}
          />
        ))}
      </div>
      <div className="reset">
        <FilterButton
          label={`RESET`}
        />
      </div>
    </FiltersDiv>
  )
};

export default Filters