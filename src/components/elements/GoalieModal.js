import React from 'react'
import Modal from 'react-modal';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		width: '75%',
		background: '#E5F1FF',
		color: '#0066E5',
		border: 'none',
		'border-radius': '0'
	},
	overlay: {
		backgroundColor: 'rgba(0, 2, 5, 0.75)'
	}
};


const GoalieModal = ({children, title, modalIsOpen, toggleModal, ...props}) => (
	<Modal
		isOpen={modalIsOpen}
		onRequestClose={toggleModal}
		style={customStyles}
		contentLabel={title}
		closeTimeoutMS={200}
	>
		{children}
	</Modal>
);

export default GoalieModal