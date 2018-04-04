import React, {Component} from 'react';
import {createFragmentContainer, graphql} from 'react-relay/compat';

import TagArtists from './TagArtists';
import TagPreview from './TagPreview';


class TagPage extends Component {
	render () {
		var data = this.props.viewer.tags.edges [0].node || {};

		return (
			<div className="tag">
				<TagPreview data={data} fullMode={true}/>
				<hr/>
				<TagArtists data={data}/>
			</div>
		);
	}
}

export default createFragmentContainer (TagPage, graphql`
	fragment TagPage_viewer on Viewer {
		tags (name: $name, first: 1) {
			edges {
				node {
					...TagPreview
					...TagArtists
				}
			}
		}
	}`
)

