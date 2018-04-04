import React, {Component} from 'react';
import Relay from 'react-relay/classic';

import Artists from './Artists';
import TagPreview from './Preview';


class TagPage extends Component {
	render () {
		var data = this.props.viewer.tags.edges [0].node || {};

		return (
			<div className="tag">
				<TagPreview data={data} fullMode={true}/>
				<hr/>
				<Artists list={data}/>
			</div>
		);
	}
}

export default Relay.createContainer(TagPage, {

	initialVariables: {
		name: '',
		artistsLimit: 48,
		artistsTagsLimit: 3
	},

	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				tags (name: $name, first: 1) {
					edges {
						node {
							${TagPreview.getFragment ('data', {fullMode: true})}
							${Artists.getFragment ('list')}
						}
					}
				}
			}
		`
	}
});

