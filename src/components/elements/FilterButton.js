import styled from 'styled-components'
import React from 'react'

const FilterButton = styled.button`
  background: ${props => props.active ? "palevioletred" : "white"};
  color: ${props => props.active ? "white" : "palevioletred"};

  :hover {
    background: ${props => props.active ? "lightcoral" : "lightgray"};
    color: ${props => props.active ? "lightgray" : "lightcoral"};
  }
`;

export default ({active, label, buttonClick, ...props}) => (
  <FilterButton
    onClick={buttonClick}
    active={active}
  >
    {label}
  </FilterButton>
)