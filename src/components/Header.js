import React from 'react'
import styled from 'styled-components'

const HeaderBar = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  height: 15vh;
  background: papayawhip;
  color: palevioletred;
  padding: 1rem;
`;

const Nav = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;

  & li:hover {
    color: tomato;
  }
`;

const Header = () => (
  <HeaderBar>
    <h1>Goalie Fight</h1>
    <Nav>
      <li>ABOUT</li>
      <li>GLOSSARY</li>
      <li>RESOURCES</li>
    </Nav>
  </HeaderBar>
);

export default Header;