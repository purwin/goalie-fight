import React from 'react'
import Select from 'react-select';

const GoalieSelector = ({index, goalie, goalieList, changeGoalie, addGoalie, pullGoalie}) => {
	let options = [];

	goalieList.forEach(goalie => {
		options.push({
			value: goalie.id,
			label: goalie.name
		})
	});

	const onChangeGoalie = newGoalie => {
		console.log(newGoalie);
		console.log(index);
		// const newGoalie = {
		// 	id: parseInt(option.target.value),
		// 	name: option.target.options[option.target.selectedIndex].text
		// }

		changeGoalie(index, newGoalie)
	}

	// const onChangeGoalie = (option) => {
	// 	const newGoalie = {
	// 		id: parseInt(option.target.value),
	// 		name: option.target.options[option.target.selectedIndex].text
	// 	}

	// 	changeGoalie(index, newGoalie)
	// }

	return(
		<div>
			<Select
        value={goalie.id}
        onChange={onChangeGoalie}
        options={options}
      />
			{/* <select
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
			</select> */}
			{index > 0 ? <button onClick={() => pullGoalie(index)}>X</button> : <button onClick={addGoalie}>+</button>}
		</div>
	)
};

export default GoalieSelector