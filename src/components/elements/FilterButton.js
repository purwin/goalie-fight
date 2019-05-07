import styled from 'styled-components'
import React from 'react'

const FilterButton = styled.button`
  border: 2px solid transparent;
  border-radius: 0;
  font-size: 1rem;
  cursor: pointer;
  background: ${props => props.active ? `#004FB2` : `#E5F1FF`};
  color: ${props => props.active ? `#F5F9FF` : `#0066E5`};

  :hover {
    background: ${props => props.active ? `#001F4C` : `#80B8FF`};
    color: ${props => props.active ? `#F5F9FF` : `#001F4C`};
  }

  :active {
    border-top: 4px solid transparent;
    border-bottom: 0;
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