// @flow

import React, {Component} from 'react';

import {createRefetchContainer, graphql} from 'react-relay';

import TagEditArtistsAdd from './TagEditArtistsAdd';
import TagEditArtistsRemove from './TagEditArtistsRemove';


import type {RelayRefetchProp} from 'react-relay';

type Variables = {
	tagId: string
};

type Props = {
	data: Object,
	relay: RelayRefetchProp,
	onArtistAdd: (id: string) => void,
	onArtistRemove: (id: string) => void,
	onArtistSearch: (term: string) => void
}

type State = {search?: string};


class ArtistsEditList extends Component <Props, State> {

	constructor (props: Props) {
		super (props);

		this.state = {};

		(this: any).onChange = this.onChange.bind (this);
	}

	onChange ({target}: SyntheticInputEvent <EventTarget>) {
		const {value: search} = target;

		this.setState ({search});
		this.props.onArtistSearch (search);

		this.props.relay.refetch (
			({tagId}: Variables) => ({tagId, search})
		);
	}

	render () {
		const {
			data,
			onArtistAdd,
			onArtistRemove
		} = this.props;

		const {search} = this.state;

		return (
			<fieldset className="search-select-control">
				<div className="search-control">
					<input
						name="search"
						value={search || ''}
						placeholder="search"
						autoComplete="off"
						className="form-control search-input"
						onChange={this.onChange}/>
				</div>

				<div className="search-select select-add">
					<TagEditArtistsAdd
						search={search}
						data={data}
						onChange={onArtistAdd}/>
				</div>

				<div className="search-select select-remove">
					<TagEditArtistsRemove
						search={search}
						data={data}
						onChange={onArtistRemove}/>
				</div>
			</fieldset>
		);
	}
}


export default createRefetchContainer (ArtistsEditList,
	graphql`
		fragment TagEditArtists on RootQuery
			@argumentDefinitions (
				tagId: {type: "ID!"}
				search: {type: "String"}
			) {
				...TagEditArtistsAdd @arguments (
					tagId: $tagId,
					search: $search
				)
				...TagEditArtistsRemove @arguments (
					tagId: $tagId,
					search: $search
				)
		}
	`,
	graphql`
		query TagEditArtistsRefetchQuery (
			$tagId: ID!,
			$search: String
		) {
			...TagEditArtists @arguments (
				tagId: $tagId,
				search: $search
			)
		}
	`
);