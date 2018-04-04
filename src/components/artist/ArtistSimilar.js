import {createFragmentContainer, graphql} from 'react-relay/compat';

import ArtistsList from './ArtistsList';


export default createFragmentContainer (ArtistsList, graphql`
	fragment ArtistSimilar on Artist {
		similar (first: 20){
			edges {
				node {
					id
					...ArtistPreview
				}
			}
		}
	}`
)