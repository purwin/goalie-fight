import React from 'react';
import styled from 'styled-components'

import GoalieSelector from './GoalieSelector'

const SelectDiv = styled.div`
	display: grid;
	grid-template-columns: 1fr;
`;


const GoalieSelectors = ({goalies, goalieList, changeGoalie, setActiveGoalie, addGoalie, pullGoalie, colors}) => {

	const goalieListSorted = goalieList.sort((a, b) => a.id - b.id);

	return(
		<SelectDiv>
			{goalies.map((goalie, i) => (
				<GoalieSelector
					key={i}
					index={i}
					goalie={goalie}
					goalies={goalies}
					goalieList={goalieListSorted}
					changeGoalie={changeGoalie}
					setActiveGoalie={setActiveGoalie}
					addGoalie={addGoalie}
					pullGoalie={pullGoalie}
					color={colors[i % colors.length]}
				/>
			))}
		</SelectDiv>
	);
}

export default GoalieSelectors;