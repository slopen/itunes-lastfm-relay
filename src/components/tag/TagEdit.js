// @flow

import React, {Component} from 'react';
import EditTagModal from 'components/modal/TagEdit';


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
	}

	onToggle (e?: Event) {
		if (e) {
			e.preventDefault ();
		}

		this.setState ({
			isOpen: !this.state.isOpen
		});
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
					onToggle={this.onToggle}/>
			</span>
		);
	}
}