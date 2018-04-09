// @flow

import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';

import {Link} from 'react-router-dom';

import type {
	TagsCloud_viewer as Fragment
} from './__generated__/TagsCloud_viewer.graphql';

type Props = {
	viewer: Fragment
};


const fx = 10000;

const style = ({artists}): {fontSize: string} => {
	const counts = artists.edges.reduce ((prev, next) =>
		prev + next.node.stats.playcount, 0);

	const value = ((counts||0) < fx ? fx : counts) / fx;
	const result = (20 + (16 * Math.log (value))).toFixed (2);

	return {
		fontSize: `${result}%`
	};
}

const TagsCloud = ({viewer}: Props) => {
	const {tags} = viewer || {};
	const {edges} = tags || {};

	if (!edges || !edges.length) {
		return null;
	}

	return (
		<ul className="list-inline cloud lowercase">
			{edges.map (({node}) =>
				<li key={node.name}
					style={style (node)}>

					<Link to={'/tags/' + node.name}>
						{node.name}
					</Link>
				</li>
			)}
		</ul>
	);
}

export default createFragmentContainer (TagsCloud, graphql`
	fragment TagsCloud_viewer on Viewer {
		tags (first: 200){
			edges {
				node {
					...on Tag {
						name
						artists (first: 4){
							edges {
								node {
									stats {
										playcount
									}
								}
							}
						}
					}
				}
			}
		}
	}`
)