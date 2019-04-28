import React from 'react'
import styled from 'styled-components'

const HeaderBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #001F4D;
  color: #E5F1FF;
  padding: 1rem;
`;

const Nav = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;

  & li {
    padding: 0 1.5rem;
  }

  & li:hover {
    color: tomato;
  }
`;

const Header = () => (
  <HeaderBar>
    <h1>Goalie Fight!</h1>
    <Nav>
      <li>ABOUT</li>
      <li>GLOSSARY</li>
      <li>RESOURCES</li>
    </Nav>
  </HeaderBar>
);

export default Header;