// @flow

import {graphql} from 'react-relay';

export default graphql`
	query TagEditArtistsAddQuery ($excludeTag: ID) {
		data: viewer {
			...TagEditArtistsAdd @arguments (
				excludeTag: $excludeTag
			)
		}
	}
`;
