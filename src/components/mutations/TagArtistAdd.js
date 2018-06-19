// @flow

import uuid from 'uuid';
import {commitMutation, graphql} from 'react-relay';

import type {Environment} from 'react-relay';

const mutation = graphql`
	mutation TagArtistAddMutation (
		$input: TagArtistAddInput!
	) {
		tagArtistAdd (input: $input) {
			tagArtistEdge {
				cursor
				node {
					id
					...ArtistPreview
				}
			}
			artistTagEdge {
				cursor
				node {
					id
					...TagPreview
				}
			}
		}
	}
`;


export default (environment: Environment, tagId: string, artistId: string) => {
	const variables = {
		input: {
			tagId,
			artistId,
			clientMutationId: uuid.v4 ()
		}
	};

	commitMutation (
		environment,
		{
			mutation,
			variables,
			onCompleted: (response: Object, errors) => {
				console.log ('* mutation response:', response, errors)
			},
			onError: (err) => console.error ('* mutation error:', err),
			configs: [{
				type: 'RANGE_ADD',
				parentID: tagId,
				connectionInfo: [{
					key: 'TagArtists_artists',
					rangeBehavior: 'prepend'
				}],
				edgeName: 'tagArtistEdge'
			},
			{
				type: 'RANGE_ADD',
				parentID: artistId,
				connectionInfo: [{
					key: 'ArtistTags_tags',
					rangeBehavior: 'prepend'
				}],
				edgeName: 'artistTagEdge'
			}]
		}
	);
}