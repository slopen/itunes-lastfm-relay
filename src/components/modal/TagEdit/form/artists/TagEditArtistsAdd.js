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
	fragment TagEditArtistsAdd on RootQuery
		@argumentDefinitions (
			tagId: {type: "ID!"}
			count: {type: "Int", defaultValue: 12}
			cursor: {type: "String"}
			search: {type: "String"}
		) {

		artists (
			first: $count
			after: $cursor
			excludeTag: $tagId
			search: $search
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
		getConnectionFromProps ({data}: Props) {
			return data && data.artists;
		},
		getVariables (props, {count, cursor}, fragmentVariables) {
			const {
				tagId,
				search
			} = fragmentVariables || {};

			return {
				count,
				cursor,
				tagId,
				search
			};
		},
		query: graphql`
			query TagEditArtistsAddPaginationQuery (
				$tagId: ID!
				$count: Int!
				$cursor: String
				$search: String
			) {
				...TagEditArtistsAdd @arguments (
					count: $count,
					cursor: $cursor,
					tagId: $tagId,
					search: $search
				)
			}
		`
	}
)