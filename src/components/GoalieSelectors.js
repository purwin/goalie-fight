import React from 'react';
import styled from 'styled-components'

import GoalieSelector from './GoalieSelector'

const SelectDiv = styled.div`
	display: grid;
	grid-template-columns: 1fr;
`;


const GoalieSelectors = ({goalies, goalieList, changeGoalie, setActiveGoalie, addGoalie, pullGoalie, colors}) => (
	<SelectDiv>
		{goalies.map((goalie, i) => (
			<GoalieSelector
				key={`selector_${i}`}
				index={i}
				goalie={goalie}
				goalies={goalies}
				goalieList={goalieList}
				changeGoalie={changeGoalie}
				setActiveGoalie={setActiveGoalie}
				addGoalie={addGoalie}
				pullGoalie={pullGoalie}
				color={colors[i % colors.length]}
			/>
		))}
	</SelectDiv>
);

export default GoalieSelectors;