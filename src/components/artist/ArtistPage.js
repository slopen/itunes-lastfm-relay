// @flow

import React from 'react'
import {createFragmentContainer, graphql} from 'react-relay';

import ArtistSimilar from './ArtistSimilar';
import ArtistPreview from './ArtistPreview';

import type {
	ArtistPage_viewer as Fragment
} from './__generated__/ArtistPage_viewer.graphql';

type Props = {
	viewer: Fragment
};

const ArtistPage = ({viewer}: Props) => {
	const {artists} = viewer || {};
	const {edges} = artists || {};

	if (!edges || !edges [0]) {
		return <div>NOT FOUND</div>

	}

	const {node} = edges [0];

	return (
		<div className="artist">
			{/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
			<ArtistPreview
				data={node}
				fullMode={true}/>

			<div className="clearfix"/>
			<hr/>

			{/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
			<ArtistSimilar
				data={node}/>
		</div>
	);

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