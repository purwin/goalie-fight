import React from 'react'
import Select from 'react-select';
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
	cursor: pointer;
	transition: font-size .5s ease;

	:hover {
		background: #E5F1FF;
		color: #001F4C;
	}

	:active {
		margin: 2.5px 0 0 0;
	}
`;

const SelectorAdd = styled(Selector)`
	background: #004FB2;
	color: #F5F9FF;

	:hover {
		background: #001F4C;
		color: #F5F9FF;
	}

	:disabled {
		background: #F47560;
		font-size: 0;
		cursor: not-allowed;
	}

	:disabled:active {
		background: #F47560;
		margin: 0 0 2.5px;
	}
`;

const GoalieSelector = ({index, goalie, goalies, goalieList, changeGoalie, setActiveGoalie, addGoalie, pullGoalie, color}) => {
	// Local onChange func to pass GoalieSelector, new goalie values to state
	const onChangeGoalie = newGoalie => {
		// Send selected option index value to state
		changeGoalie(index, newGoalie)
		// Set new state.activeGoalie
		setActiveGoalie(index)
	}

	// Pass color props to selected option
	const styleColor = {
		singleValue: (styles) => ({
			...styles,
			color: color,
			fontWeight: `bold`
		})
	};


	return(
		<SelectDiv>
			<Select
				value={goalie.name && goalie}
				onChange={onChangeGoalie}
				options={goalieList}
				getOptionLabel={option =>`${option.name} (${option.team})`}
				getOptionValue={option =>`${option.name} (${option.team})`}
				menuShouldScrollIntoView={false}
				styles={styleColor}
				isOptionDisabled={(option) => goalies.find(goalie => (
					goalie.id === option.id && goalie.name === option.name && goalie.team === option.team
				))}
			/>
			{
				index > 0
				? <Selector onClick={() => pullGoalie(index)}>
						<FontAwesomeIcon icon="times" />
					</Selector>
				: <SelectorAdd
						onClick={addGoalie}
						disabled={goalies.length > 7}
					>
						<FontAwesomeIcon icon="plus" />
					</SelectorAdd>
			}
		</SelectDiv>
	)
};

export default GoalieSelector
