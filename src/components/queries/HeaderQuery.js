import {graphql} from 'react-relay/compat';

export default graphql`
	query HeaderQuery {
		viewer {
			...Header_viewer
		}
	}
`;
