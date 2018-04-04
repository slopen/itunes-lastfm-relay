import React, {Component} from 'react';
import {createFragmentContainer, graphql} from 'react-relay/compat';

import {Link} from 'react-router-dom';

class Header extends Component {

	render () {
		const {params, viewer} = this.props || {};
		const path = params.type === 'tags' ? 'artists' : 'tags';
		const title = params.type !== 'tags' ? 'artists' : 'tags';

		return (
			<h1 className="main-header hoverable">
				<div className="pull-right counter">
					<Link to={'/' + title}>{viewer [title].count}</Link>
				</div>
				<Link to={'/' + path}>{title}</Link>
			</h1>
		);
	}
}

export default createFragmentContainer (Header, graphql`
	fragment Header_viewer on Viewer {
		artists (first:1) {
			count
		}
		tags (first:1) {
			count
		}
	}`
);