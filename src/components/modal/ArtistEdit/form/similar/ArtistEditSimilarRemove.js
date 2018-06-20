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

type ArtistsType = {|
	+id: string,
	+similar: {|
		+edges: $ReadOnlyArray <ArtistPreviewNode>,
		+pageInfo?: Object
	|}
|};

type Props = {
	relay?: RelayPaginationProp,
	data: {
		artist: ArtistsType
	},
	onChange: (id: string) => void
};



const ArtistsSimilarRemoveList = ({relay, data, onChange}: Props) =>
	relay ? <RelayList
		limit={8}
		relay={relay}
		list={data.artist.similar.edges}
		renderRow={({node}: ArtistPreviewNode) =>
			<ArtistSelectItem
				data={node}
				key={node.id}
				onAction={() => onChange (node.id)}
				actionIcon={<i className="fa fa-times"/>}/>
		}/> : null;


export default createPaginationContainer (ArtistsSimilarRemoveList, graphql`
	fragment ArtistEditSimilarRemove on RootQuery
		@argumentDefinitions (
			artistId: {type: "ID!"},
			count: {type: "Int", defaultValue: 12}
			cursor: {type: "String"}
			search: {type: "String"}
		) {

		artist: node (id: $artistId) {
			...on Artist {
				similar (
					first: $count
					after: $cursor
					search: $search
				) @connection(key: "ArtistSimilar_similar") {
					edges {
						node {
							id
							...ArtistSelectItem
						}
					}
				}
			}
		}
	}`,
	{
		direction: 'forward',
		getConnectionFromProps ({data}: Props) {
			return data && data.artist.similar;
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
			query ArtistEditSimilarRemovePaginationQuery (
				$artistId: ID!
				$count: Int!
				$cursor: String
				$search: String
			) {
				...ArtistEditSimilarRemove @arguments (
					artistId: $artistId,
					count: $count,
					cursor: $cursor,
					search: $search
				)
			}
		`
	}
);