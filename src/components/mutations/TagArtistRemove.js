// @flow

import uuid from 'uuid';
import {commitMutation, graphql} from 'react-relay';

import type {Environment} from 'react-relay';

const mutation = graphql`
	mutation TagArtistRemoveMutation (
		$input: TagArtistRemoveInput!
	) {
		tagArtistRemove (input: $input) {
			tagArtistId

			viewerAddArtistEdge {
				cursor
				node {
					id
					...ArtistPreview
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
			onCompleted: (response: Object) => {
				console.log ('* mutation response:', response)
			},
			onError: (err) => console.error ('* mutation error:', err),
			configs: [{
				// removing tag -> artist connection item
				type: 'RANGE_DELETE',
				parentID: tagId,
				connectionKeys: [{
					key: 'TagArtists_artists'
				}],
				pathToConnection: ['tag', 'artists'],
				deletedIDFieldName: 'tagArtistId'
			}, {
				// adding viewer -> artists by excludeTag connection item
				type: 'RANGE_ADD',
				parentID: 'viewer',
				connectionInfo: [{
					key: 'TagEditArtistsAdd_artists',
					filters: {excludeTag: tagId},
					rangeBehavior: 'prepend'
				}],
				edgeName: 'viewerAddArtistEdge'
			}]
		}
	);
}