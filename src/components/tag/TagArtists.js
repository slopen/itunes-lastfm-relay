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
	+tagArtists: {|
		+edges: $ReadOnlyArray <ArtistPreviewNode>
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
		list={data.tagArtists.edges}
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
				tag: node (id: $id) {
					...TagArtists @arguments (count: $count, cursor: $cursor)
				}
			}
		`
	}
);