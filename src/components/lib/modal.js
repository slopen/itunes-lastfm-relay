import React from 'react';

import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from 'reactstrap';

export default ({
	isOpen,
	toggle,
	title,
	onConfirm,
	children
}) =>
	<Modal
		isOpen={isOpen}
		toggle={toggle}>

		<ModalHeader toggle={toggle}>
			{title}
		</ModalHeader>

		<ModalBody>
			{children}
		</ModalBody>

		<ModalFooter>
			<button
				onClick={toggle}
				className="btn btn-sm btn-default">cancel</button>
			<button
				onClick={onConfirm}
				className="btn btn-sm btn-success">confirm</button>
		</ModalFooter>
	</Modal>