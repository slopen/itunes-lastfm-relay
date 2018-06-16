// @flow

import uuid from 'uuid';
import {commitMutation, graphql} from 'react-relay';

import type {Environment} from 'react-relay';

const mutation = graphql`
	mutation UpdateTagMutation (
		$input: UpdateTagInput!
	) {
		updateTag (input: $input) {
			tag {
				name
				id
			}
		}
	}
`;

export default (environment: Environment, name: string, id: string) => {
	console.log (name, id);

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