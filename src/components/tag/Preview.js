import React, {Component} from 'react';
import Relay from 'react-relay/classic';

import {Link} from 'react-router';

class TagPreview extends Component {

	getStats () {
		const {data: {artists}} = this.props;

		return artists && artists.edges.reduce ((stats, edge) => {
			stats.listeners += edge.node.stats.listeners;
			stats.playcount += edge.node.stats.playcount;

			return stats;
		}, {listeners: 0, playcount: 0})
	}

	render () {
		const {data, fullMode} = this.props;
		const stats = this.getStats();

		const link = (
			<Link to={'/tag/' + data.name}>{data.name}</Link>
		);

		return (
			<div className="text-item">
				{fullMode ? (<h1>{link}</h1>) : (<h5>{link}</h5>)}

				{fullMode ? (
					<div className="stats">{
						stats.listeners + ' / ' + stats.playcount
					}</div>
				): null}
			</div>
		);
	}
}

export default Relay.createContainer (TagPreview, {

	initialVariables: {
		lookup: 24,
		fullMode: false
	},

	fragments: {
		data: () => Relay.QL`
			fragment on Tag {
				name

				artists (first:$lookup) @include(if: $fullMode){
					edges {
						node {
							stats {
								listeners
								playcount
							}
						}
					}
				}
			}
		`
	}
});