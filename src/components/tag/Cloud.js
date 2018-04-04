import React, {Component} from 'react';
import Relay from 'react-relay/classic';
import {Link} from 'react-router';


class TagsCloud extends Component {

	getFontSize (edges) {
		var counts = edges.reduce ((prev, next) =>
			prev + next.node.stats.playcount, 0);

		var fx = 10000,
			value = ((counts||0) < fx ? fx : counts) / fx,
			result = (20 + (16 * Math.log (value))).toFixed (2);

		return result;
	}

	render () {
			var tags = (this.props.viewer.tags.edges || []).slice (0, 2000),
				getFontSize = this.getFontSize;

			return (
				<ul className="list-inline cloud lowercase">
					{tags.map ((edge) => {
						const item = edge.node;

						return (
							<li key={item.name}
								style={{fontSize: getFontSize (item.artists.edges) + '%'}}>

								<Link to={'/tag/' + item.name}>
									{item.name}
								</Link>
							</li>
						);
					})}
				</ul>
			);
		}
}

export default Relay.createContainer(TagsCloud, {

	initialVariables: {
		limit: 100,
		lookup: 50
	},

	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
					tags (first: $limit){
							edges {
									node {
										... on Tag {
												name
												artists (first: $lookup){
														edges {
																node {
																		stats {
																				playcount
																		}
																}
														}
												}
										}
									}
							}
					}
			}
		`,
	}

});