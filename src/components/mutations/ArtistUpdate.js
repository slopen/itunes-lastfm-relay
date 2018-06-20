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
	name: string,
	bio: {
		summary: ?string
	}
};

const mutation = graphql`
	mutation ArtistUpdateMutation (
		$input: ArtistUpdateInput!
	) {
		artistUpdate (input: $input) {
			artist {
				id
				...ArtistPreview
			}
		}
	}
`;

export default (environment: Environment, {
	artistId,
	name
}: MutationData) => {
	const variables = {
		input: {
			artistId,
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