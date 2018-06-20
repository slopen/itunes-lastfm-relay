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
	mutation ArtistSimilarAddMutation (
		$input: ArtistSimilarAddInput!
	) {
		artistSimilarAdd (input: $input) {
			removedAvailableSimilarId

			addedConnectedSimilarEdge {
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
			artistId,
			similarId,
			clientMutationId: uuid.v4 ()
		}
	};

	commitMutation (
		environment,
		{
			mutation,
			variables,
			onCompleted: (response: Object) => {
				console.log ('* mutation response:', response);
			},
			onError: (err) => console.error ('* mutation error:', err),
			configs: [{
				// removing viewer -> artists by excludeTag connection item
				type: 'RANGE_DELETE',
				parentID: 'client:root',
				connectionKeys: [{
					key: 'ArtistEditSimilarAdd_artists',
					filters: {
						excludeSimilar: artistId,
						search
					}
				}],
				pathToConnection: ['client:root', 'artists'],
				deletedIDFieldName: 'removedAvailableSimilarId'
			}, {
				// adding tag -> artist connection item
				type: 'RANGE_ADD',
				parentID: artistId,
				connectionInfo: [{
					key: 'ArtistSimilar_similar',
					filters: {
						search: search || ''
					},
					rangeBehavior: 'prepend'
				},
				{
					key: 'ArtistSimilar_similar',
					rangeBehavior: 'prepend'
				}],
				edgeName: 'addedConnectedSimilarEdge'
			}]
		}
	);
}