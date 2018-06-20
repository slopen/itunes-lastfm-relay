// @flow

import {graphql} from 'react-relay';

export default graphql`
	query TagEditArtistsQuery ($id: ID!) {
		...TagEditArtists @arguments (tagId: $id)
	}
`;
