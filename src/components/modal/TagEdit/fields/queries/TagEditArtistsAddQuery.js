// @flow

import {graphql} from 'react-relay';

export default graphql`
	query TagEditArtistsAddQuery {
		data: viewer {
			...TagEditArtistsAdd
		}
	}
`;
