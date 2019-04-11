import React from 'react';

import GoalieSelector from './GoalieSelector'


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
				/>
			))}
		</div>
	);
}

export default GoalieSelectors;