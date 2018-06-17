// @flow

import {graphql} from 'react-relay';

export default graphql`
	query HeaderQuery {
		viewer {
			...Header_viewer
		}
	}
`;
