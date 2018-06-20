// @flow

import {graphql} from 'react-relay';

export default graphql`
	query ArtistPageQuery ($name: String!) {
		...ArtistPage
	}
`;
