import React, {Component} from 'react';
import Relay from 'react-relay/classic';
import {Link} from 'react-router';

import fragments from 'components/queries/Fragments';

class ArtistCloud extends Component {

	getFontSize (counts) {
		var fx = 10000,
			value = ((counts||0)< fx ? fx : counts) / fx,
			result = (20 + (18 * Math.log(value))).toFixed (2);

		return result;
	}

	render () {
		var artists = (this.props.viewer.artists.edges || []).slice(0, 1000),
			getFontSize = this.getFontSize;

		return (
			<ul className="list-inline cloud">
				{artists.map ((edge) => {
					const item = edge.node;
					const stats = item.stats || {};

					return (
						<li key={item.id}
							style={{fontSize: getFontSize (stats.playcount) + '%'}}>
							<Link to={'/artist/' + item.name}>{item.name}</Link>
						</li>
					);
				})}
			</ul>
		);
	}

}

export default Relay.createContainer (ArtistCloud, {

	initialVariables: {
		limit: 150
	},

	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				artists (first: $limit){
					edges {
						node {
							${fragments.ARTIST_SHORT}
						}
					}
				}
			}
		`
	}

});
