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
			viewerAddArtistId
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
				// adding tag -> artist connection item
				type: 'RANGE_ADD',
				parentID: tagId,
				connectionInfo: [{
					key: 'TagArtists_artists',
					rangeBehavior: 'prepend'
				}],
				edgeName: 'tagArtistEdge'
			}, {
				// removing viewer -> artists by excludeTag connection item
				type: 'RANGE_DELETE',
				parentName: 'viewer',
				parentID: 'viewer',
				connectionKeys: [{
					key: 'TagEditArtistsAdd_artists',
					filters: {excludeTag: tagId}
				}],
				pathToConnection: ['viewer', 'artists'],
				deletedIDFieldName: 'viewerAddArtistId'
			}]
		}
	);
}