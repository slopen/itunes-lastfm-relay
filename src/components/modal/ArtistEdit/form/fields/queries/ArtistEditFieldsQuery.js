// @flow

import {graphql} from 'react-relay';

export default graphql`
	query ArtistEditFieldsQuery ($id: ID!) {
		data: node (id: $id) {
			...ArtistEditFields
		}
	}
`;
