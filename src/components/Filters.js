import React from 'react'
import Select from 'react-select';
import styled from 'styled-components'

import FilterButton from './elements/FilterButton'

const FiltersDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-auto-flow: column;
  grid-gap: 4px;
  padding: 4px;
  background: #4C9CFF;
  color: #0066E5;
`;

const options = [
	{ value: '2009', label: '2009–10' },
	{ value: '2010', label: '2010–11' },
	{ value: '2011', label: '2011–12' },
	{ value: '2012', label: '2013' },
	{ value: '2013', label: '2013–14' },
	{ value: '2014', label: '2014–15' },
	{ value: '2015', label: '2015–16' },
	{ value: '2016', label: '2016–17' },
	{ value: '2017', label: '2017–18' },
	{ value: '2018', label: '2018–19' },
];

// Pass style props to Year Selects
const styleYear = {
  control: (base, state) => ({
    ...base,
    height: `25px`,
    'min-height': `25px`,
    'border-radius': `0`,
    background: `#E5F1FF`,
    color: `#004FB2`,
    'border-width': `0`,
    cursor: `pointer`,
    "&:hover": {
      background: `#80B8FF`,
    }
  }),
  singleValue: (styles) => ({
    ...styles,
    color: `#004FB2`,
    width: `100%`,
    margin: `0`,
    'max-width': `calc(100% - 16px)`,
  }),
  placeholder: (styles) => ({
    ...styles,
    color: `#004FB2`,
    width: `100%`,
    margin: `0`,
    'max-width': `calc(100% - 16px)`,
  })
};


const Filters = ({time, situation, setSituation, resetState, ...props}) => {
  const situationFilters = [`5v5`, `4v5`, `EVENS`, `PK`, `ALL`, ];

  return(
    <FiltersDiv>
      <Select
        value={options.filter(option => option.value === time)}
        isDisabled={false}
        escapeClearsValue={false}
        isClearable={false}
        isSearchable={false}
        onChange={(e) => {console.log(e)}}
        options={options}
        styles={styleYear}
        components={{ DropdownIndicator: null, IndicatorSeparator: null }}
      />
      <Select
        value={false}
        isDisabled={true}
        escapeClearsValue={false}
        isClearable={false}
        isSearchable={false}
        onChange={(e) => {console.log(e)}}
        options={options}
        placeholder={`– –`}
        styles={styleYear}
        components={{ DropdownIndicator: null, IndicatorSeparator: null }}
      />
      
      {situationFilters.map((filter, i) => (
        <FilterButton
          key={`filter_${i}`}
          active={situation === filter}
          label={filter}
          buttonClick={e => setSituation(e.target.innerText)}
        />
      ))}
      <FilterButton
        label={`RESET`}
        buttonClick={resetState}
      />
    
    </FiltersDiv>
  )
};

export default Filters