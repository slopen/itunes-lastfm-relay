// @flow

import React, {Component} from 'react';

import Modal from 'components/lib/modal';
import Fields from './fields';

import type {RelayProp} from 'react-relay';

type TagData = {
	id: string,
	name: string
};

type Props = {
	data: TagData,
	relay: RelayProp,
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

		(this: any).onChange = this.onChange.bind (this);
		(this: any).onConfirm = this.onConfirm.bind (this);
	}

	onChange (data: Object) {
		this.setState ({...data});
	}

	onConfirm () {
		this.props.onConfirm (this.state);
	}

	render () {
		const {
			data,
			relay,
			isOpen,
			onToggle
		} = this.props;

		return (
			<Modal
				title="edit tag"
				isOpen={isOpen}
				toggle={onToggle}
				onConfirm={this.onConfirm}>

				<Fields
					data={data}
					relay={relay}
					onChange={this.onChange}/>
			</Modal>
		);
	}

}