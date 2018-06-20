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
	artistId: string,
	similarId: string,
	search?: string
};

const mutation = graphql`
	mutation ArtistSimilarRemoveMutation (
		$input: ArtistSimilarRemoveInput!
	) {
		artistSimilarRemove (input: $input) {
			removedConnectedSimilarId

			addedAvailableSimilarEdge {
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
	artistId,
	similarId,
	search
}: MutationData) => {
	const variables = {
		input: {
			similarId,
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
				// removing artist -> similar artist connection item
				type: 'RANGE_DELETE',
				parentID: artistId,
				connectionKeys: [{
					key: 'ArtistSimilar_similar',
					filters: {
						search: search || ''
					}
				},
				{
					key: 'ArtistSimilar_similar'
				}],
				pathToConnection: ['artist', 'similar'],
				deletedIDFieldName: 'removedConnectedSimilarId'
			}, {
				// adding root -> artists by excludeTag connection item
				type: 'RANGE_ADD',
				parentID: 'client:root',
				connectionInfo: [{
					key: 'ArtistEditSimilarAdd_artists',
					filters: {
						excludeSimilar: artistId,
						search
					},
					rangeBehavior: 'prepend'
				}],
				edgeName: 'addedAvailableSimilarEdge'
			}]
		}
	);
}