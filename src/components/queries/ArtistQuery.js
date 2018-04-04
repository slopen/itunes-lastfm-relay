import {graphql} from 'react-relay';

export default graphql`
	query ArtistQuery ($name: String!) {
		viewer {
			...ArtistPage_viewer
		}
	}
`;
