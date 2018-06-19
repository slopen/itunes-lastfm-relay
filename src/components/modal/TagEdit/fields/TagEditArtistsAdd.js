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
	relay: RelayPaginationProp,
	onChange: (id: string) => void,
	data: {
		+artists: {
			+edges: $ReadOnlyArray <ArtistPreviewNode>
		}
	}
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
					<i className="fa fa-plus"/>
				}/>
		}/>


export default createPaginationContainer (ArtistsList, graphql`
	fragment TagEditArtistsAdd on Viewer
		@argumentDefinitions (
			count: {type: "Int", defaultValue: 12}
			cursor: {type: "String"}
			excludeTag: {type: "ID"}
		) {

		artists (
			first: $count
			after: $cursor
			excludeTag: $excludeTag
		) @connection (key: "TagEditArtistsAdd_artists") {
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
		getVariables (props, {count, cursor}, fragmentVariables) {
			return {
				count,
				cursor,
				excludeTag: fragmentVariables
					? fragmentVariables.excludeTag
					: null
			};
		},
		query: graphql`
			query TagEditArtistsAddPaginationQuery (
				$count: Int!
				$cursor: String
				$excludeTag: ID
			) {
				data: viewer {
					...TagEditArtistsAdd @arguments (
						count: $count,
						cursor: $cursor,
						excludeTag: $excludeTag
					)
				}
			}
		`
	}
)