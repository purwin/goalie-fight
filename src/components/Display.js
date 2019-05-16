import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Stats from './Stats'
import GoalieView from './GoalieView'

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 500px));
  grid-gap: 2rem;
  padding: 2rem;
  background: #B3D5FF;
  overflow-y: auto;
  justify-content: space-evenly;

  @media screen and (max-width: 767.98px) {
    grid-template-columns: 1fr;
  }
`;

const Display = ({stats, goalies, activeGoalie, setActiveGoalie, goalieList, time, situation, changeGoalie, addGoalie, pullGoalie, setSituation, resetState, ...props}) => {

  // Define Nivo colors to pass to Stats and GoalieView as props
  const colors = [
    `#E8C0A0`,
    `#F47560`,
    `#F1E05C`,
    `#E7A838`,
    `#61CDBB`,
    `#98E2D5`,
  ];

  return(
    <MainContainer>
      <Stats
        stats={stats}
        rankTotal={goalieList.length}
        activeGoalie={activeGoalie}
        setActiveGoalie={setActiveGoalie}
        colors={colors}
      />
      <GoalieView
        stats={stats}
        goalies={goalies}
        goalieList={goalieList}
        time={time}
        situation={situation}
        changeGoalie={changeGoalie}
        setActiveGoalie={setActiveGoalie}
        addGoalie={addGoalie}
        pullGoalie={pullGoalie}
        setSituation={setSituation}
        resetState={resetState}
        colors={colors}
      />
    </MainContainer>
  )
};

Display.propTypes = {
  stats: PropTypes.array,
  goalies: PropTypes.array,
  goalieList: PropTypes.array,
  time: PropTypes.string,
  situation: PropTypes.string,
  changeGoalie: PropTypes.func,
  addGoalie: PropTypes.func,
  pullGoalie: PropTypes.func,
  activeGoalie: PropTypes.number,
  setActiveGoalie: PropTypes.func,
  setSituation: PropTypes.func,
  resetState: PropTypes.func,
}

export default Display