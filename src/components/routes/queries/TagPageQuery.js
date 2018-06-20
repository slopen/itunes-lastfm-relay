// @flow

import {graphql} from 'react-relay';

export default graphql`
	query TagPageQuery ($name: String!) {
		...TagPage
	}
`;
