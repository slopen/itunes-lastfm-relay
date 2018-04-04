import {createFragmentContainer, graphql} from 'react-relay/compat';

import ArtistsList from '../artist/ArtistsList';


export default createFragmentContainer (ArtistsList, graphql`
	fragment TagArtists on Tag {
		artists (first: 24) {
			edges {
				node {
					id
					...ArtistPreview
				}
			}
		}
	}`
)