// @flow

import React, {Component} from 'react';

import Modal from 'components/lib/modal';
import Fields from './fields';

import TagArtistAddMutation from 'components/mutations/TagArtistAdd';
import TagArtistRemoveMutation from 'components/mutations/TagArtistRemove';

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

		(this: any).onFieldChange = this.onFieldChange.bind (this);
		(this: any).onArtistAdd = this.onArtistAdd.bind (this);
		(this: any).onArtistRemove = this.onArtistRemove.bind (this);
		(this: any).onConfirm = this.onConfirm.bind (this);
	}

	onFieldChange (data: Object) {
		this.setState ({...data});
	}

	onArtistAdd (id: string) {
		const {
			data,
			relay: {environment}
		} = this.props;

		console.log ('onArtistAdd', id);

		TagArtistAddMutation (environment, id, data.id);
	}

	onArtistRemove (id: string) {
		const {
			data,
			relay: {environment}
		} = this.props;

		console.log ('onArtistRemove', id);

		TagArtistRemoveMutation (environment, id, data.id);
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
					onFieldChange={this.onFieldChange}
					onArtistAdd={this.onArtistAdd}
					onArtistRemove={this.onArtistRemove}/>
			</Modal>
		);
	}

}