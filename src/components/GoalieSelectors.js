import React from 'react';
import styled from 'styled-components'

import GoalieSelector from './GoalieSelector'

const SelectDiv = styled.div`
	display: grid;
	grid-template-columns: 1fr;
`;


const GoalieSelectors = ({goalies, goalieList, changeGoalie, addGoalie, pullGoalie}) => {

	const goalieListSorted = goalieList.sort((a, b) => a.id - b.id);

	return(
		<SelectDiv>
			{goalies.map((goalie, i) => (
				<GoalieSelector
					key={i}
					index={i}
					goalie={goalie}
					goalieList={goalieListSorted}
					changeGoalie={changeGoalie}
					addGoalie={addGoalie}
					pullGoalie={pullGoalie}
				/>
			))}
		</SelectDiv>
	);
}

export default GoalieSelectors;