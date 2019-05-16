import React from 'react'
import Modal from 'react-modal';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	},
	overlay: {
		backgroundColor: 'tomato'
	}
};


const GoalieModal = ({children, title, modalIsOpen, toggleModal, ...props}) => (
	<Modal
		isOpen={modalIsOpen}
		onRequestClose={toggleModal}
		style={customStyles}
		contentLabel={title}
	>
		<button onClick={toggleModal}>X</button>
		{children}
	</Modal>
);

export default GoalieModal