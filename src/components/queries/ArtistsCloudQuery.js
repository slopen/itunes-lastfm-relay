import {graphql} from 'react-relay/compat';

export default graphql`
	query ArtistCloudQuery {
		viewer {
			...ArtistsCloud_viewer
		}
	}
`;
