// @flow

import uuid from 'uuid';
import {
	commitMutation,
	graphql
} from 'react-relay';

import type {
	Environment
} from 'react-relay';

type MutationData = {
	tagId: string,
	artistId: string,
	search?: string
};

const mutation = graphql`
	mutation TagArtistRemoveMutation (
		$input: TagArtistRemoveInput!
	) {
		tagArtistRemove (input: $input) {
			removedConnectedArtistsId

			addedAvailableArtistEdge {
				cursor
				node {
					id
					...ArtistPreview
				}
			}
		}
	}
`;

export default (environment: Environment, {
	tagId,
	artistId,
	search
}: MutationData) => {
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
					key: 'TagArtists_artists',
					filters: {
						search: search || ''
					}
				},
				{
					key: 'TagArtists_artists',
					rangeBehavior: 'prepend'
				}],
				pathToConnection: ['tag', 'artists'],
				deletedIDFieldName: 'removedConnectedArtistsId'
			}, {
				// adding root -> artists by excludeTag connection item
				type: 'RANGE_ADD',
				parentID: 'client:root',
				connectionInfo: [{
					key: 'TagEditArtistsAdd_artists',
					filters: {
						excludeTag: tagId,
						search
					},
					rangeBehavior: 'prepend'
				}],
				edgeName: 'addedAvailableArtistEdge'
			}]
		}
	);
}