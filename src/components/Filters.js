import React from 'react'
import styled from 'styled-components'

import FilterButton from './elements/FilterButton'

const FiltersDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  background: yellow;
  color: aquamarine;
`;

const SituationFiltersDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const TimeFiltersDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const Filters = ({time, situation, setSituation}) => {
  const timeFilters = [`2017–18`, `2018–19`];
  const situationFilters = [`EVENS`, `5v5`, `ALL`, `PK`, `4v5`, ];

  return(
    <FiltersDiv>
      <TimeFiltersDiv>
        {timeFilters.map((filter, i) => (
          <FilterButton
            key={i}
            active={time === filter}
            label={filter}
          />
        ))}
      </TimeFiltersDiv>
      <SituationFiltersDiv>
        {situationFilters.map((filter, i) => (
          <FilterButton
            key={i}
            active={situation === filter}
            label={filter}
            buttonClick={e => setSituation(e.target.innerText)}
          />
        ))}
        <FilterButton
          label={`RESET`}
        />
      </SituationFiltersDiv>
    </FiltersDiv>
  )
};

export default Filters