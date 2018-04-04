import React, {Component} from 'react'
import Relay from 'react-relay/classic';

import Similar from './Similar';
import ArtistPreview from './Preview';


class ArtistPage extends Component {

	render () {
		var data = this.props.viewer.artists.edges [0].node || {};

		return (
			<div className="artist">
				<ArtistPreview data={data} fullMode={true}/>
				<div className="clearfix"/>
				<hr/>
				<Similar list={data}/>
			</div>
		);
	}

}

export default Relay.createContainer (ArtistPage, {

	initialVariables: {
		name: '',
		tagsLimit: 6,
		artistsLimit: 24,
		artistsTagsLimit: 3
	},

	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				artists (name: $name, first: 1) {
					edges {
						node {
							${ArtistPreview.getFragment('data', {fullMode: true})}
							${Similar.getFragment('list')}
						}
					}
				}
		}`
	}
});