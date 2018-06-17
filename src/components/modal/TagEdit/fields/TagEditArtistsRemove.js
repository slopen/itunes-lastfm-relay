// @flow

import React from 'react';
import {createPaginationContainer, graphql} from 'react-relay';

import RelayList from 'components/lib/relay-list';
import ArtistSelectItem from 'components/artist/ArtistSelectItem';


import type {RelayPaginationProp} from 'react-relay';
import type {ArtistSelectItemType} from 'components/artist/ArtistSelectItem';

type ArtistItemType = {
	...$Exact<ArtistSelectItemType>,
	id: string
};

type ArtistPreviewNode = {
	node: ArtistItemType
};

type TagArtistsType = {|
	+id: string,
	+tagArtists: {|
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
		list={data.tagArtists.edges}
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

		tagArtists: artists (
			first: $count
			after: $cursor
		) @connection(key: "TagEditArtistsRemove_tagArtists") {
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
			return data && data.tagArtists;
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