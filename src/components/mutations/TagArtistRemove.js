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
			artistTagId
		}
	}
`;


export default (environment: Environment, artistId: string, tagId: string) => {
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
				console.log ('response received from server:', response, errors)
			},
			onError: (err) => console.error (err),
			configs: [{
				type: 'RANGE_DELETE',
				parentID: tagId,
				connectionKeys: [{
					key: 'TagArtists_artists'
				}],
				pathToConnection: ['tag', 'artists'],
				deletedIDFieldName: 'tagArtistId'
			},
			{
				type: 'RANGE_DELETE',
				parentID: artistId,
				connectionKeys: [{
					key: 'ArtistTags_tags'
				}],
				pathToConnection: ['artist', 'tags'],
				deletedIDFieldName: 'artistTagId'
			}]
		}
	);
}