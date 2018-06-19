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

type TagArtistsType = {|
	+id: string,
	+artists: {|
		+edges: $ReadOnlyArray <ArtistPreviewNode>
	|}
|};

type Props = {
	relay: RelayPaginationProp,
	data: TagArtistsType,
	onChange: (id: string) => void
};


const ArtistsList = ({relay, data, onChange}: Props) =>
	<RelayList
		limit={12}
		relay={relay}
		list={data.artists.edges}
		renderRow={({node}: ArtistPreviewNode) =>
			<ArtistSelectItem
				data={node}
				key={node.id}
				onAction={() =>
					onChange (node.id)
				}
				actionIcon={
					<i className="fa fa-times"/>
				}/>
		}/>


export default createPaginationContainer (ArtistsList, graphql`
	fragment TagEditArtistsRemove on Tag
		@argumentDefinitions (
			count: {type: "Int", defaultValue: 12}
			cursor: {type: "String"}
		) {

		id

		artists (
			first: $count
			after: $cursor
		) @connection(key: "TagArtists_artists") {
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
		getConnectionFromProps ({data}) {
			return data && data.artists;
		},
		getVariables: ({data: {id}}: Props, {count, cursor}) => ({
			id,
			count,
			cursor
		}),
		query: graphql`
			query TagEditArtistsRemovePaginationQuery (
				$id: ID!
				$count: Int!
				$cursor: String
			) {
				tag: node (id: $id) {
					...TagEditArtistsRemove @arguments (count: $count, cursor: $cursor)
				}
			}
		`
	}
);