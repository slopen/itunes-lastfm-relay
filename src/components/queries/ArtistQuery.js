import {graphql} from 'react-relay/compat';

export default graphql`
	query ArtistQuery ($name: String!) {
		viewer {
			...ArtistPage_viewer
		}
	}
`;
