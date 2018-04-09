// @flow

import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';

import TagArtists from './TagArtists';
import TagPreview from './TagPreview';

import type {
    TagPage_viewer as Fragment
} from './__generated__/TagPage_viewer.graphql';


type Props = {
	viewer: Fragment
};

const TagPage = ({viewer}: Props) => {
	const {tags} = viewer || {};
	const {edges} = tags || {};

	if (!edges || !edges [0]) {
		return <div>NOT FOUND</div>

	}

	const {node} = edges [0];

	return (
		<div className="tag">
			{/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
			<TagPreview data={node} fullMode={true}/>

			<hr/>

			{/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
			<TagArtists data={node}/>
		</div>
	);
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

