// @flow

import React, {Component} from 'react';
import Modal from 'components/lib/modal';

type ArtistData = {
	name: string,
	description: string
};

type Props = {
	data: ArtistData,
	isOpen?: boolean,
	onToggle: () => void,
	onConfirm: (Object) => void
};

type State = {
	...ArtistData
};

export default class ArtistEditModal extends Component <Props, State> {

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
			name = data.name,
			description = data.description
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

				<textarea
					required
					name="description"
					value={description}
					onFocus={this.onFocus}
					onChange={this.onChange}
					className="form-control"
					placeholder="description"/>
			</Modal>
		);
	}

}