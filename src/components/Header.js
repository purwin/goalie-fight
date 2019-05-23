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
  width: 100%;

  @media screen and (max-width: 767.98px) {
    flex-direction: column;
  }
`;

const Nav = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;

  & li {
    padding: 0 1.5rem;
  }

  & li:hover {
    color: #B3D5FF;
  }
`;

const AboutModal = () => (
  <div>
    <h3>About Goalie Fight!</h3>
    <p>I am a Flyers fan. Goalies are my nightmares.</p>
    <p>Goalie Fight! is a Data Visualization project pitting goalie stats head to head.</p>
    <p>Most data is culled from the amazing <a href="http://www.naturalstattrick.com/">Natural Stat Trick</a>. Please check out their <a href="https://www.patreon.com/naturalstattrick">Patreon</a> and give them all your money.</p>
    <p>Have non-threatening questions or comments? Send ’em my way!</p>
  </div>
);

const GlossaryModal = () => (
  <div>
    <h3>Terms</h3>
    <div>
      <div>GP</div><div>Games Played</div>
      <div>TOI</div><div>Time on Ice</div>
      <div>SHOTS</div><div>Shots Against</div>
      <div>SHOTS/60</div><div>Shots Against Per-60 Mins</div>
      <div>SV%</div><div>Save Percentage</div>
      <div>xSV%</div><div>Expected Save Percentage</div>
      <div>dSV%</div><div>Delta Save Percentage</div>
      <div>GSAA</div><div>Goals Saved Above Average</div>
      <div>GSAA/60</div><div>Goals Saved Above Average Per-60 Mins</div>
      <div>HDSV%</div><div>High-Danger Save Percentage</div>
      <div>HDGSAA</div><div>High-Danger Goals Saved Above Average </div>
      <div>HDGSAA/60</div><div>High-Danger Goals Saved Above Average Per-60 Mins</div>
    </div>
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
        >
          <AboutModal />
        </GoalieModal>
      </HeaderBar>
    );
  }
}

export default Header;
