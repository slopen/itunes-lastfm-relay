// @flow

import React from 'react'
import {createFragmentContainer, graphql} from 'react-relay';

import ArtistSimilar from './ArtistSimilar';
import ArtistPreview from './ArtistPreview';

export type ArtistPageType = {|
	+artists: ?{|
		+edges: $ReadOnlyArray<{|
			+node: {|

			|}
		|}>
	|}
|};


type Props = {
	data: ArtistPageType
};

const ArtistPage = ({data}: Props) => {
	const {artists} = data || {};
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
	fragment ArtistPage on RootQuery {
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