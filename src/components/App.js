import React, {Component} from 'react';
import {createFragmentContainer, graphql} from 'react-relay';

import Header from './Header';


class App extends Component {
	render () {
		const {routes, children, viewer} = this.props;

		return (
			<div className="container">
				<hr/>
				<div className="content">
					{children}
				</div>
			</div>
		);
	}
}
				// <Header routes={routes} viewer={viewer}/>

export default createFragmentContainer (App, graphql`
	fragment App_viewer on Viewer {
		...Header_viewer
	}`
)
