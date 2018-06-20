// @flow

import React from 'react';
import {createPaginationContainer, graphql} from 'react-relay';

import RelayList from 'components/lib/relay-list';
import ArtistSelectItem from 'components/artist/ArtistSelectItem';


import type {RelayPaginationProp} from 'react-relay';
import type {ArtistSelectItemType} from 'components/artist/ArtistSelectItem';

type ArtistPreviewNode = {
	node: ArtistSelectItemType
};

type Props = {
	relay?: RelayPaginationProp,
	data: {
		+artists: {
			+edges: $ReadOnlyArray <ArtistPreviewNode>,
			+pageInfo?: Object
		}
	},
	onChange: (id: string) => void,
};


const TagArtistsAddList = ({relay, data, onChange}: Props) =>
	relay ? <RelayList
		limit={8}
		relay={relay}
		list={data.artists.edges}
		renderRow={({node}: ArtistPreviewNode) =>
			<ArtistSelectItem
				data={node}
				key={node.id}
				onAction={() => onChange (node.id)}
				actionIcon={<i className="fa fa-plus"/>}/>
		}/> : null;

export default createPaginationContainer (TagArtistsAddList, graphql`
	fragment ArtistEditSimilarAdd on RootQuery
		@argumentDefinitions (
			artistId: {type: "ID!"}
			count: {type: "Int", defaultValue: 12}
			cursor: {type: "String"}
			search: {type: "String"}
		) {

		artists (
			first: $count
			after: $cursor
			excludeSimilar: $artistId
			search: $search
		) @connection (key: "ArtistEditSimilarAdd_artists") {
			edges {
				node {
					id
					...ArtistSelectItem
				}
			}
		}
	}`,
	{
		direction: 'forward',
		getConnectionFromProps ({data}: Props) {
			return data && data.artists;
		},
		getVariables (props, {count, cursor}, fragmentVariables) {
			const {
				artistId,
				search
			} = fragmentVariables || {};

			return {
				count,
				cursor,
				artistId,
				search
			};
		},
		query: graphql`
			query ArtistEditSimilarAddPaginationQuery (
				$artistId: ID!
				$count: Int!
				$cursor: String
				$search: String
			) {
				...ArtistEditSimilarAdd @arguments (
					count: $count,
					cursor: $cursor,
					artistId: $artistId,
					search: $search
				)
			}
		`
	}
)