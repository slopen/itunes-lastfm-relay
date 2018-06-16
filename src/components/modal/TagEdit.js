// @flow

import React, {Component} from 'react';
import Modal from 'components/lib/modal';

type TagData = {
	name: string
};

type Props = {
	data: TagData,
	isOpen?: boolean,
	onToggle: () => void,
	onConfirm: (Object) => void
};

type State = {
	...TagData
};

export default class TagEditModal extends Component <Props, State> {

	constructor (props: Props) {
		super (props);

		this.state = {};

		(this: any).onFocus = this.onFocus.bind (this);
		(this: any).onChange = this.onChange.bind (this);
		(this: any).onConfirm = this.onConfirm.bind (this);
	}

	onFocus () {
		if (!Object.keys (this.state).length) {
			this.setState ({...this.props.data});
		}
	}

	onChange ({target: {name, value}}: SyntheticInputEvent <EventTarget>) {
		this.setState ({[name]: value});
	}

	onConfirm () {
		this.props.onConfirm (this.state);
	}

	render () {
		const {
			data,
			isOpen,
			onToggle
		} = this.props;

		const {
			name = data.name
		} = this.state;

		return (
			<Modal
				title="edit tag"
				isOpen={isOpen}
				toggle={onToggle}
				onConfirm={this.onConfirm}>

				<input
					required
					name="name"
					value={name}
					onFocus={this.onFocus}
					onChange={this.onChange}
					className="form-control"
					placeholder="name"
					type="text"/>
			</Modal>
		);
	}

}