// @flow

import {graphql} from 'react-relay';

export default graphql`
	query TagEditFieldsQuery ($id: ID!) {
		data: node (id: $id) {
			...TagEditFields
		}
	}
`;
