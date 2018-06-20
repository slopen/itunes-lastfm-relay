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
	name: string
};

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

export default (environment: Environment, {
	tagId,
	name
}: MutationData) => {
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
			onCompleted: (response: Object) => {
				console.log ('* mutation response:', response);
			},
			onError: (err) => console.error ('* mutation error:', err)
		}
	);
}