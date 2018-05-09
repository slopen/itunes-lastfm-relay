// @flow

import {createPaginationContainer, graphql} from 'react-relay';
import type {RelayPaginationProp} from 'react-relay';

import ArtistsList from '../artist/ArtistsList';

export type TagArtistsType = {|
	+id: string,
	+tagArtists: {|
		+edges: $ReadOnlyArray<{|
			+node: {|
				+id: string
			|}
		|}>
	|}
|};

type Props = {
	relay: RelayPaginationProp,
	data: TagArtistsType
};


export default createPaginationContainer (ArtistsList, graphql`
	fragment TagArtists on Tag
		@argumentDefinitions (
			count: {type: "Int", defaultValue: 12}
			cursor: {type: "String"}
		) {

		id

		tagArtists: artists (
			first: $count
			after: $cursor
		) @connection(key: "TagArtists_tagArtists") {
			edges {
				node {
					id
					...ArtistPreview
				}
			}
		}
	}`,
	{
		direction: 'forward',
		getConnectionFromProps ({data}) {
			return data && data.tagArtists;
		},
		getVariables ({data}: Props, {count, cursor}) {
			return {
				id: data.id,
				count,
				cursor
			};
		},
		query: graphql`
			query TagArtistsQuery (
				$id: ID!
				$count: Int!
				$cursor: String
			) {
				tag: node (id: $id) {
					...TagArtists @arguments (count: $count, cursor: $cursor)
				}
			}
		`
	}
);