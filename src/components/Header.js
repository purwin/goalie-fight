import React, {Component} from 'react'
import styled from 'styled-components'

import GoalieModal from './elements/GoalieModal'

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

const AboutModal = () => (
  <div>
    <h3>About</h3>
    <p>I am a Flyers fan. Goalies are my nightmares.</p>
    <p>Goalie Fight! is a Data Visualization project pitting goalie stats head to head.</p>
    <p>Most data is culled from the amazing Natural Stat Trick. Please check out their Patreon and give them all your money.</p>
    <p>Have non-threatening questions or comments? Send 'em my way!</p>
  </div>
);

const GlossaryModal = () => (
  <div>
    <h3>Terms</h3>
    <table>
    </table>
  </div>
);


class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen
    }))
  };

  render() {
    return(
      <HeaderBar>
        <h1>Goalie Fight!</h1>
        <Nav>
          <li onClick={this.toggleModal}>ABOUT</li>
          <li onClick={this.toggleModal}>GLOSSARY</li>
        </Nav>
        <GoalieModal
          modalIsOpen={this.state.modalIsOpen}
          toggleModal={this.toggleModal}
          children={AboutModal}
        />
      </HeaderBar>
    );
  }
}

export default Header;