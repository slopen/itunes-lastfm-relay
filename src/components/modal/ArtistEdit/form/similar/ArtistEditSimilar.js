// @flow

import React, {Component} from 'react';

import {createRefetchContainer, graphql} from 'react-relay';

import ArtistEditSimilarAdd from './ArtistEditSimilarAdd';
import ArtistEditSimilarRemove from './ArtistEditSimilarRemove';


import type {RelayRefetchProp} from 'react-relay';

type Variables = {
	artistId: string
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
			({artistId}: Variables) => ({artistId, search})
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
					<ArtistEditSimilarAdd
						search={search}
						data={data}
						onChange={onArtistAdd}/>
				</div>

				<div className="search-select select-remove">
					<ArtistEditSimilarRemove
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
		fragment ArtistEditSimilar on RootQuery
			@argumentDefinitions (
				artistId: {type: "ID!"}
				search: {type: "String"}
			) {
				...ArtistEditSimilarAdd @arguments (
					artistId: $artistId,
					search: $search
				)
				...ArtistEditSimilarRemove @arguments (
					artistId: $artistId,
					search: $search
				)
		}
	`,
	graphql`
		query ArtistEditSimilarRefetchQuery (
			$artistId: ID!,
			$search: String
		) {
			...ArtistEditSimilar @arguments (
				artistId: $artistId,
				search: $search
			)
		}
	`
);