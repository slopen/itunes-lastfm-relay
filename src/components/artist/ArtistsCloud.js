// @flow

import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import {Link} from 'react-router-dom';

import type {
	ArtistsCloud_viewer as Fragment
} from './__generated__/ArtistsCloud_viewer.graphql';

type Props = {
	viewer: Fragment
};

const fx = 10000;

const style = (counts): {fontSize: string} => {
	const value = ((counts || 0) < fx ? fx : counts) / fx;
	const result = (20 + (18 * Math.log (value))).toFixed (2);

	return {
		fontSize: `${result}%`
	};
};

const ArtistsCloud = ({viewer}: Props) => {
	const {artists} = viewer || {};
	const {edges} = artists || {};

	if (!edges || !edges.length) {
		return null;
	}

	return (
		<ul className="list-inline cloud">
			{edges.map (({node}) =>
				<li key={node.id}
					style={style (node.stats && node.stats.playcount)}>
					<Link to={'/artists/' + node.name}>{node.name}</Link>
				</li>
			)}
		</ul>
	);
}

export default createFragmentContainer (ArtistsCloud, graphql`
	fragment ArtistsCloud_viewer on Viewer {
		artists (first: 250){
			edges {
				node {
					id
					name
					stats {
						playcount
					}
				}
			}
		}
	}`
)