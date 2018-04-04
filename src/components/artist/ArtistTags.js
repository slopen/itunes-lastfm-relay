import React, {Component} from 'react';
import {createFragmentContainer, graphql} from 'react-relay/compat';

import TagPreview from '../tag/TagPreview';

class TagsList extends Component {
	render () {
		var tags = this.props.data.tags.edges || [];

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

export default createFragmentContainer (TagsList, graphql`
	fragment ArtistTags on Artist {
		tags (first: 3) {
			edges {
				node {
					id
					...TagPreview
				}
			}
		}
	}`
)