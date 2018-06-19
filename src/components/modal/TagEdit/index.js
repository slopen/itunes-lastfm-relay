// @flow

import React, {Component} from 'react';

import Modal from 'components/lib/modal';
import Fields from './fields';

import TagUpdateMutation from 'components/mutations/TagUpdate';
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
	onToggle: () => void
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
	}

	onFieldChange (data: TagData) {
		const {data: {id}, relay: {environment}} = this.props;

		TagUpdateMutation (environment, id, data.name);
	}

	onArtistAdd (artistId: string) {
		const {data, relay: {environment}} = this.props;

		TagArtistAddMutation (environment, data.id, artistId);
	}

	onArtistRemove (artistId: string) {
		const {data, relay: {environment}} = this.props;

		TagArtistRemoveMutation (environment, data.id, artistId);
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
				toggle={onToggle}>

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