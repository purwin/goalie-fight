import React from 'react'
import Select from 'react-select';
import { ID } from 'postcss-selector-parser';

const GoalieSelector = ({index, goalie, goalieList, changeGoalie, addGoalie, pullGoalie}) => {
	// Set select options
	let options = [];

	// Loop through goalieList, set goalie ID, name to value, label
	goalieList.forEach(goalie => {
		options.push({
			value: goalie.id,
			label: goalie.name
		})
	});

	// Local onChange func to pass GoalieSelector, new goalie values to state
	const onChangeGoalie = newGoalie => {
		// Send selected option values to state
		changeGoalie(index, newGoalie)
	}

	return(
		<div>
			<Select
        value={goalie.id}
        onChange={onChangeGoalie}
        options={options}
      />
			{index > 0 ? <button onClick={() => pullGoalie(index)}>X</button> : <button onClick={addGoalie}>+</button>}
		</div>
	)
};

export default GoalieSelector