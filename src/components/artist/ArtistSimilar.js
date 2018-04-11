// @flow

import {createPaginationContainer, graphql} from 'react-relay';

import ArtistsList from './ArtistsList';

import type {
    ArtistSimilar as Fragment
} from './__generated__/ArtistSimilar.graphql';

type Props = {
	data: Fragment
};


export default createPaginationContainer (ArtistsList, graphql`
	fragment ArtistSimilar on Artist
		@argumentDefinitions (
			count: {type: "Int", defaultValue: 12}
			cursor: {type: "String"}
		) {

		id

		artistSimilar: similar (
			first: $count
			after: $cursor
		) @connection(key: "ArtistsList_artistSimilar") {
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
			return data && data.artistSimilar;
		},
		getVariables ({data}: Props, {count, cursor}) {
			return {
				id: data.id,
				count,
				cursor
			};
		},
		query: graphql`
			query ArtistSimilarQuery (
				$id: ID!,
				$count: Int!
				$cursor: String
			) {
				artist (id: $id) {
					...ArtistSimilar @arguments (first: $count, cursor: $cursor)
				}
			}
		`
	}
);