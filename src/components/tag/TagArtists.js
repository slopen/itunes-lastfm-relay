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

type TagArtistsType = {|
	+id: string,
	+artists: {|
		+edges: $ReadOnlyArray <ArtistPreviewNode>,
		+pageInfo?: Object
	|}
|};

type Props = {
	relay: RelayPaginationProp,
	data: TagArtistsType
};


const ArtistsList = ({relay, data}: Props) =>
	<RelayList
		limit={12}
		relay={relay}
		list={data.artists.edges}
		renderRow={({node}: ArtistPreviewNode) =>
			<div className="item" key={node.id}>
				<ArtistPreview data={node}/>
			</div>
		}/>


export default createPaginationContainer (ArtistsList, graphql`
	fragment TagArtists on Tag
		@argumentDefinitions (
			count: {type: "Int", defaultValue: 12}
			cursor: {type: "String"}
		) {

		id

		artists (
			first: $count
			after: $cursor
		) @connection (key: "TagArtists_artists") {
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
			return data && data.artists;
		},
		getVariables: ({data: {id}}: Props, {count, cursor}) => ({
			id,
			count,
			cursor
		}),
		query: graphql`
			query TagArtistsPaginationQuery (
				$id: ID!
				$count: Int!
				$cursor: String
			) {
				node (id: $id) {
					...TagArtists @arguments (count: $count, cursor: $cursor)
				}
			}
		`
	}
);