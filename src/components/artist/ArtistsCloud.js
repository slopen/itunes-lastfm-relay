import React, {Component} from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import {Link} from 'react-router-dom';

const style = (counts) => {
	const fx = 10000;
	const value = ((counts || 0) < fx ? fx : counts) / fx;
	const result = (20 + (18 * Math.log (value))).toFixed (2);

	return {
		fontSize: `${result}%`
	};
};

class ArtistsCloud extends Component {
	render () {
		var artists = this.props.viewer.artists.edges || [];

		return (
			<ul className="list-inline cloud">
				{artists.map (({node}) =>
					<li key={node.id}
						style={style (node.stats && node.stats.playcount)}>
						<Link to={'/artists/' + node.name}>{node.name}</Link>
					</li>
				)}
			</ul>
		);
	}

}

export default createFragmentContainer (ArtistsCloud, graphql`
	fragment ArtistsCloud_viewer on Viewer {
		artists (first: 250){
			edges {
				node {
					id
					name
					stats {
						playcount
					}
				}
			}
		}
	}`
)