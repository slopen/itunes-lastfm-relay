// @flow

import React from 'react'
import {createFragmentContainer, graphql} from 'react-relay';

import ArtistSimilar from './ArtistSimilar';
import ArtistPreview from './ArtistPreview';

export type ArtistPageFragment = {|
	+artists: ?{|
		+edges: $ReadOnlyArray<{|
			+node: {|

			|}
		|}>
	|}
|};


type Props = {
	viewer: ArtistPageFragment
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
			<ArtistPreview
				data={node}
				fullMode={true}/>

			<div className="clearfix"/>
			<hr/>

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