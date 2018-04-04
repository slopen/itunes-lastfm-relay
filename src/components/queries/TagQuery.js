import {graphql} from 'react-relay/compat';

export default graphql`
	query TagQuery ($name: String!) {
		viewer {
			...TagPage_viewer
		}
	}
`;
