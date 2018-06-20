// @flow

import {graphql} from 'react-relay';

export default graphql`
	query ArtistEditSimilarQuery ($id: ID!) {
		...ArtistEditSimilar @arguments (artistId: $id)
	}
`;
