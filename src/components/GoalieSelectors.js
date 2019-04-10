import React from 'react';

import GoalieSelector from './GoalieSelector'


const GoalieSelectors = ({goalies, goalieList}) => {

	const goalieListSorted = goalieList.sort((a, b) => a.id - b.id);

	return(
		<div>
			{goalies.map((goalie, i) => (
				<GoalieSelector
					key={i}
					goalie={goalie}
					goalieList={goalieListSorted}
				/>
			))}
			{goalies.length > 1 ? <button>X</button> : <button>+</button>}
		</div>
	);
}

export default GoalieSelectors;