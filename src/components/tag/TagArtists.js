// @flow

import {createFragmentContainer, graphql} from 'react-relay';

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