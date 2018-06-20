// @flow

import React from 'react';
import {createPaginationContainer, graphql} from 'react-relay';

import RelayList from 'components/lib/relay-list';
import ArtistPreview from 'components/artist/ArtistPreview';


import type {RelayPaginationProp} from 'react-relay';
import type {ArtistPreviewType} from 'components/artist/ArtistPreview';

type ArtistPreviewNode = {
	node: ArtistPreviewType
};

type ArtistSimilarType = {|
	+id: string,
	+artistSimilar: {|
		+edges: $ReadOnlyArray <ArtistPreviewNode>,
		+pageInfo?: Object
	|}
|};

type Props = {
	relay: RelayPaginationProp,
	data: ArtistSimilarType
};

const ArtistsList = ({relay, data}: Props) =>
	<RelayList
		limit={12}
		relay={relay}
		list={data.artistSimilar.edges}
		renderRow={({node}: ArtistPreviewNode) =>
			<div className="item" key={node.id}>
				<ArtistPreview data={node}/>
			</div>
		}/>


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
		) @connection (key: "ArtistsList_artistSimilar") {
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
		getConnectionFromProps ({data}: Props) {
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
			query ArtistSimilarPaginationQuery (
				$id: ID!,
				$count: Int!
				$cursor: String
			) {
				artist: node (id: $id) {
					...ArtistSimilar @arguments (first: $count, cursor: $cursor)
				}
			}
		`
	}
);