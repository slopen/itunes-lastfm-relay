// @flow

import {graphql} from 'react-relay';

export default graphql`
	query ArtistsCloudQuery {
		...ArtistsCloud
	}
`;
