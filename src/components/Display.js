import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Comparables from './Comparables'
import Stats from './Stats'
import GoalieView from './GoalieView'

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  padding: 1rem;
  background: #B3D5FF;
  color: cadetblue;
`;

const Display = ({stats, goalies, goalieList, time, situation, changeGoalie, addGoalie, pullGoalie, setSituation}) => {

  return(
    <MainContainer>
      <Stats
        stats={stats}
        rankTotal={goalieList.length}
      />
      <GoalieView
        stats={stats}
        goalies={goalies}
        goalieList={goalieList}
        time={time}
        situation={situation}
        changeGoalie={changeGoalie}
        addGoalie={addGoalie}
        pullGoalie={pullGoalie}
        setSituation={setSituation}
      />
      <Comparables />
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