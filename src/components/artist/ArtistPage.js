import React, {Component} from 'react'
import {createFragmentContainer, graphql} from 'react-relay';

import ArtistSimilar from './ArtistSimilar';
import ArtistPreview from './ArtistPreview';


class ArtistPage extends Component {
	render () {
		var data = this.props.viewer.artists.edges [0].node || {};

		return (
			<div className="artist">
				<ArtistPreview data={data} fullMode={true}/>

				<div className="clearfix"/>
				<hr/>

				<ArtistSimilar data={data}/>
			</div>
		);
	}
}

export default createFragmentContainer (ArtistPage, graphql`
	fragment ArtistPage_viewer on Viewer {
		artists (name: $name, first: 1) {
			edges {
				node {
					...ArtistPreview
					...ArtistSimilar
				}
			}
		}
	}`
);