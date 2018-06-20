// @flow

import React, {Component} from 'react';

import Modal from 'components/lib/modal';
import Form from './form';

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
	search?: string
};

export default class TagEditModal extends Component <Props, State> {

	constructor (props: Props) {
		super (props);

		this.state = {};

		(this: any).onFieldChange = this.onFieldChange.bind (this);
		(this: any).onArtistAdd = this.onArtistAdd.bind (this);
		(this: any).onArtistRemove = this.onArtistRemove.bind (this);
		(this: any).onArtistSearch = this.onArtistSearch.bind (this);
	}

	onFieldChange ({name}: TagData) {
		const {
			data: {id: tagId},
			relay: {environment}
		} = this.props;

		TagUpdateMutation (environment, {tagId, name});
	}


	onArtistSearch (search: string) {
		this.setState ({search});
	}

	onArtistAdd (artistId: string) {
		const {
			data: {id: tagId},
			relay: {environment}
		} = this.props;

		const {search} = this.state;

		TagArtistAddMutation (environment, {
			tagId,
			artistId,
			search
		});
	}

	onArtistRemove (artistId: string) {
		const {
			data: {id: tagId},
			relay: {environment}
		} = this.props;

		const {search} = this.state;

		TagArtistRemoveMutation (environment, {
			tagId,
			artistId,
			search
		});
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

				<Form
					data={data}
					relay={relay}
					onFieldChange={this.onFieldChange}
					onArtistAdd={this.onArtistAdd}
					onArtistRemove={this.onArtistRemove}
					onArtistSearch={this.onArtistSearch}/>
			</Modal>
		);
	}

}