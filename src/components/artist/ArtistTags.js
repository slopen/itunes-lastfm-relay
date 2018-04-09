// @flow

import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';

import TagPreview from '../tag/TagPreview';

import type {
    ArtistTags as Fragment
} from './__generated__/ArtistTags.graphql';


type Props = {
	data: Fragment
};

const TagsList = ({data}: Props) => {
	const {tags} = data || {};
	const {edges} = tags || {};

	if (!edges || !edges.length) {
		return null;
	}

	return (
		<ul className="list-inline tags">
			{edges.map (({node}) =>
				<li key={node.id}>
					{/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
					<TagPreview data={node}/>
				</li>
			)}
		</ul>
	);
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