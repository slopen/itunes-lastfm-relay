import {graphql} from 'react-relay/compat';

export default graphql`
	query TagsCloudQuery {
		viewer {
			...TagsCloud_viewer
		}
	}
`;
