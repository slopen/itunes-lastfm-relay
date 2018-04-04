import {graphql} from 'react-relay';

export default graphql`
	query TagsCloudQuery {
		viewer {
			...TagsCloud_viewer
		}
	}
`;
