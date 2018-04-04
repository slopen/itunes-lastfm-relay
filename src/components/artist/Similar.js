import Relay from 'react-relay/classic';

import ArtistPreview from './Preview';
import ArtistsList from './List';


export default Relay.createContainer (ArtistsList, {

	initialVariables: {
		artistsLimit: 48,
		artistsTagsLimit: 3
	},

	fragments: {
		list: () => Relay.QL`
			fragment on Artist {
				similar (first: $artistsLimit){
					edges {
						node {
							id
							${ArtistPreview.getFragment('data')}
						}
					}
				}
			}
		`
	}
});