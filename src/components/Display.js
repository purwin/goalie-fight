import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// import Comparables from './Comparables'
// import Stats from './Stats'
import GoalieView from './GoalieView'

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(500px, 1fr));
  background: mintcream;
  color: cadetblue;
`;

const Display = ({stats, goalies, goalieList, time, situation, changeGoalie, addGoalie, pullGoalie}) => {

  return(
    <MainContainer>
      {/* <Stats
        stats={stats}
      /> */}
      <GoalieView
        stats={stats}
        goalies={goalies}
        goalieList={goalieList}
        time={time}
        situation={situation}
        changeGoalie={changeGoalie}
        addGoalie={addGoalie}
        pullGoalie={pullGoalie}
      />
      {/* <Comparables /> */}
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
}

export default Display