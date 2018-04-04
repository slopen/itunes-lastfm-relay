import React, {Component} from 'react';
import Relay from 'react-relay/classic';

import {Link} from 'react-router';

class Header extends Component {

	render () {
		const {routes, viewer} = this.props || {};

		var route = routes [1],
			path = '',
			title = '';

		if (route) {
			path = (route.path || '')
				.match (/^tag/g) ? 'artists' : 'tags';

			title = (route.path || '')
				.match (/^tag/g) ? 'tags' : 'artists';
		}

		return (
			<h1 className="main-header hoverable">
				<div className="pull-right counter">{viewer [title].count}</div>
				<Link to={'/' + path}>{title}</Link>
			</h1>
		);
	}
}

export default Relay.createContainer (Header, {

	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				artists (first:1) {
					count
				}
				tags (first:1) {
					count
				}
			}
		`
	}

});