// @flow

import {createPaginationContainer, graphql} from 'react-relay';

import ArtistsList from '../artist/ArtistsList';

import type {
    TagArtists as Fragment
} from './__generated__/TagArtists.graphql';

type Props = {
	data: Fragment
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
				tag (id: $id) {
					...TagArtists @arguments(first: $count, cursor: $cursor)
				}
			}
		`
	}
);