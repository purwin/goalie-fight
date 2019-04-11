import React from 'react'

const GoalieSelector = ({index, goalie, goalieList, changeGoalie, addGoalie, pullGoalie}) => {

	const onChangeGoalie = (option) => {
    console.log(option.target.options[option.target.selectedIndex].text);
    console.log(option.target.value);
		// changeGoalie()
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
			{index > 0 ? <button onClick={addGoalie}>X</button> : <button onClick={() => pullGoalie(index)}>+</button>}
		</div>
	)
};

export default GoalieSelector