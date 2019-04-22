import React from 'react'
import Select from 'react-select';
import { ID } from 'postcss-selector-parser';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SelectDiv = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	grid-gap: 1rem;
	margin-bottom: .5rem;
`;

const Selector = styled.button`
	height: 38px;
	width: 38px;
	border: none;
	border-radius: 50%;
	background: #F5F9FF;
	color: #004FB2;
	margin: 0 0 2.5px;
	font-size: 1rem;

	&:active {
		margin: 2.5px 0 0 0;
	}
`;

const SelectorAdd = styled(Selector)`
	background: #004FB2;
	color: #F5F9FF;
`;

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
		<SelectDiv>
			<Select
        value={goalie.id}
        onChange={onChangeGoalie}
				options={options}
      />
			{index > 0 ? <Selector onClick={() => pullGoalie(index)}><FontAwesomeIcon icon="times" /></Selector> : <SelectorAdd onClick={addGoalie}><FontAwesomeIcon icon="plus" /></SelectorAdd>}
		</SelectDiv>
	)
};

export default GoalieSelector