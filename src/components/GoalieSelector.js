import React from 'react'

const GoalieSelector = ({goalie, goalieList}) => {
	return(
		<div>
			<select>
				<option value="">Select a Goalie!</option>
				{goalieList.map(goalieOption => (
					<option
						key={goalieOption.id}
						value={goalieOption.id}
						selected={goalie.id === goalieOption.id}
					>
						{goalieOption.name}
					</option>
				))}
			</select>
		</div>
	)
};

export default GoalieSelector