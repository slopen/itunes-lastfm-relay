// @flow

import React, {Component} from 'react';

import Modal from 'components/lib/modal';
import Form from './form';

import ArtistUpdateMutation from 'components/mutations/ArtistUpdate';
import ArtistSimilarAddMutation from 'components/mutations/ArtistSimilarAdd';
import ArtistSimilarRemoveMutation from 'components/mutations/ArtistSimilarRemove';

import type {RelayProp} from 'react-relay';

type ArtistData = {
	id: string,
	name: string,
	bio: {
		summary: ?string
	}
};

type Props = {
	data: ArtistData,
	relay: RelayProp,
	isOpen?: boolean,
	onToggle: () => void
};

type State = {
	similarSearch?: string
};

export default class ArtistEditModal extends Component <Props, State> {

	constructor (props: Props) {
		super (props);

		this.state = {};

		(this: any).onFieldChange = this.onFieldChange.bind (this);
		(this: any).onSimilarAdd = this.onSimilarAdd.bind (this);
		(this: any).onSimilarRemove = this.onSimilarRemove.bind (this);
		(this: any).onSimilarSearch = this.onSimilarSearch.bind (this);
	}

	onFieldChange ({name, bio}: ArtistData) {
		const {
			data: {id: artistId},
			relay: {environment}
		} = this.props;

		ArtistUpdateMutation (environment, {
			artistId,
			name,
			bio
		});
	}


	onSimilarSearch (similarSearch: string) {
		this.setState ({similarSearch});
	}

	onSimilarAdd (similarId: string) {
		const {
			data: {id: artistId},
			relay: {environment}
		} = this.props;

		const {similarSearch: search} = this.state;

		ArtistSimilarAddMutation (environment, {
			artistId,
			similarId,
			search
		});
	}

	onSimilarRemove (similarId: string) {
		const {
			data: {id: artistId},
			relay: {environment}
		} = this.props;

		const {similarSearch: search} = this.state;

		ArtistSimilarRemoveMutation (environment, {
			artistId,
			similarId,
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
				title="edit artist"
				isOpen={isOpen}
				toggle={onToggle}>

				<Form
					data={data}
					relay={relay}
					onFieldChange={this.onFieldChange}
					onSimilarAdd={this.onSimilarAdd}
					onSimilarRemove={this.onSimilarRemove}
					onSimilarSearch={this.onSimilarSearch}/>
			</Modal>
		);
	}

}