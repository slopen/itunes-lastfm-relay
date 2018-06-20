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
		+edges: $ReadOnlyArray <ArtistPreviewNode>,
		+pageInfo?: Object
	|}
|};

type Props = {
	relay?: RelayPaginationProp,
	data: TagArtistsType,
	onChange: (id: string) => void
};



const TagArtistsRemoveList = ({relay, data, onChange}: Props) =>
	relay ? <RelayList
		limit={8}
		relay={relay}
		list={data.artists.edges}
		renderRow={({node}: ArtistPreviewNode) =>
			<ArtistSelectItem
				data={node}
				key={node.id}
				onAction={() => onChange (node.id)}
				actionIcon={<i className="fa fa-times"/>}/>
		}/> : null;


export default createPaginationContainer (TagArtistsRemoveList, graphql`
	fragment TagEditArtistsRemove on Tag
		@argumentDefinitions (
			count: {type: "Int", defaultValue: 12}
			cursor: {type: "String"}
			search: {type: "String"}
		) {

		artists (
			first: $count
			after: $cursor
			search: $search
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
			query TagEditArtistsRemovePaginationQuery (
				$tagId: ID!
				$count: Int!
				$cursor: String
				$search: String
			) {
				connected: node (id: $tagId) {
					...TagEditArtistsRemove @arguments (
						count: $count,
						cursor: $cursor,
						search: $search
					)
				}
			}
		`
	}
);