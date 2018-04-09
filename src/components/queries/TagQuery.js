// @flow

import {graphql} from 'react-relay';

export default graphql`
	query TagQuery ($name: String!) {
		viewer {
			...TagPage_viewer
		}
	}
`;
