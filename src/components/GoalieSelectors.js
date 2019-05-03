import React from 'react';
import styled from 'styled-components'

import GoalieSelector from './GoalieSelector'

const SelectDiv = styled.div`
	display: grid;
	grid-template-columns: 1fr;
`;

const colors = [
  `#E8C0A0`,
  `#F47560`,
  `#F1E05C`,
  `#E7A838`,
  `#61CDBB`,
  `#98E2D5`,
];


const GoalieSelectors = ({goalies, goalieList, changeGoalie, addGoalie, pullGoalie}) => {

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
					addGoalie={addGoalie}
					pullGoalie={pullGoalie}
					color={colors[i % colors.length]}
				/>
			))}
		</SelectDiv>
	);
}

export default GoalieSelectors;