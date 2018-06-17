// @flow

import {graphql} from 'react-relay';

export default graphql`
	query TagEditArtistsRemoveQuery ($id: ID!) {
		data: node (id: $id) {
			...TagEditArtistsRemove
		}
	}
`;
