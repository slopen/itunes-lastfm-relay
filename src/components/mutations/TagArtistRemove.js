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