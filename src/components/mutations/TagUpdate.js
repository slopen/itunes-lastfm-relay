// @flow

import uuid from 'uuid';
import {commitMutation, graphql} from 'react-relay';

import type {Environment} from 'react-relay';

const mutation = graphql`
	mutation TagUpdateMutation (
		$input: TagUpdateInput!
	) {
		tagUpdate (input: $input) {
			tag {
				name
				id
			}
		}
	}
`;

export default (environment: Environment, tagId: string, name: string) => {
	const variables = {
		input: {
			tagId,
			name,
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
			onError: (err) => console.error ('* mutation error:', err)
		}
	);
}