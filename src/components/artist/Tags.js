import React, {Component} from 'react';
import Relay from 'react-relay/classic';

import TagPreview from '../tag/Preview';

class TagsList extends Component {
	render () {
		var tags = this.props.list.tags.edges || [];

		return (
			<ul className="list-inline tags">
				{tags.map ((edge) => {
					var item = edge.node;

					return (
						<li key={item.id}>
							<TagPreview data={item}/>
						</li>
					);
				})}
			</ul>
		);
	}
}

export default Relay.createContainer (TagsList, {

	initialVariables: {
		artistsLimit: 48,
		artistsTagsLimit: 3
	},

	fragments: {
		list: () => Relay.QL`
			fragment on Artist {
				tags (first: $artistsTagsLimit){
					edges {
						node {
								id
								${TagPreview.getFragment ('data')}
						}
					}
				}
			}
		`
	}
});