import React from 'react'

const GoalieSelector = ({index, goalie, goalieList, changeGoalie, addGoalie, pullGoalie}) => {

	const onChangeGoalie = (option) => {
		const newGoalie = {
			id: option.target.value,
			name: option.target.options[option.target.selectedIndex].text
		}

		changeGoalie(index, newGoalie)
	}
	return(
		<div>
			<select
				value={goalie.id}
				onChange={onChangeGoalie}
			>
				<option value="">Select a Goalie!</option>
				{goalieList.map(goalieOption => (
					<option
						key={goalieOption.id}
						value={goalieOption.id}
						goalie={goalieOption.name}
					>
						{goalieOption.name}
					</option>
				))}
			</select>
			{index > 0 ? <button onClick={() => pullGoalie(index)}>X</button> : <button onClick={addGoalie}>+</button>}
		</div>
	)
};

export default GoalieSelector