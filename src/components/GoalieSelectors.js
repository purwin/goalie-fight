import React from 'react';
import styled from 'styled-components'

import GoalieSelector from './GoalieSelector'

const SelectDiv = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 1rem;
`;


const GoalieSelectors = ({goalies, goalieList, changeGoalie, addGoalie, pullGoalie}) => {

	const goalieListSorted = goalieList.sort((a, b) => a.id - b.id);

	return(
		<div>
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
		</div>
	);
}

export default GoalieSelectors;