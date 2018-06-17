// @flow

import uuid from 'uuid';
import {commitMutation, graphql} from 'react-relay';

import type {Environment} from 'react-relay';

const mutation = graphql`
	mutation TagArtistAddMutation (
		$input: TagArtistAddInput!
	) {
		tagArtistAdd (input: $input) {
			tag {
				name
				id
			}
		}
	}
`;

export default (environment: Environment, name: string, id: string) => {
	const variables = {
		input: {
			name,
			id,
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
			onError: (err) => console.error (err)
		},
	);
}