// @flow

import React, {Component} from 'react';
import EditTagModal from 'components/modal/TagEdit';

import TagUpdateMutation from 'components/mutations/TagUpdate';

import type {RelayProp} from 'react-relay';

type TagData = {
	id: string,
	name: string
};

type Props = {
	data: TagData,
	relay: RelayProp
};

type State = {
	isOpen?: boolean
};

export default class TagEdit extends Component <Props, State> {

	constructor (props: Props) {
		super (props);

		this.state = {};

		(this: any).onToggle = this.onToggle.bind (this);
		(this: any).onConfirm = this.onConfirm.bind (this);
	}

	onToggle (e?: Event) {
		if (e) {
			e.preventDefault ();
		}

		this.setState ({
			isOpen: !this.state.isOpen
		});
	}

	onConfirm (data: TagData) {
		const {
			data: {id},
			relay: {environment}
		} = this.props;

		console.log ('on confirm', data);

		TagUpdateMutation (environment, data.name, id);
	}

	render () {
		const {data, relay} = this.props;
		const {isOpen} = this.state;

		return (
			<span>
				<a
					href="#"
					className="item-edit"
					onClick={this.onToggle}>
					<i className="fa fa-pencil"/>
				</a>

				<EditTagModal
					data={data}
					relay={relay}
					isOpen={isOpen}
					onToggle={this.onToggle}
					onConfirm={this.onConfirm}/>
			</span>
		);
	}
}