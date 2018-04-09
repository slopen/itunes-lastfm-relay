// @flow

import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';

import {Link} from 'react-router-dom';

import type {
    TagPreview as Fragment
} from './__generated__/TagPreview.graphql';


type Stats = {
	listeners: number,
	playcount: number
};

type Props = {
	data: Fragment,
	fullMode: boolean
};

const getStats = ({data: {artists}}): Stats => {
	return artists
		? artists.edges.reduce ((stats, edge) => {
			stats.listeners += edge.node.stats.listeners;
			stats.playcount += edge.node.stats.playcount;

			return stats;
		}, {listeners: 0, playcount: 0})
		: {listeners: 0, playcount: 0};
};

const TagPreview = ({data, fullMode}: Props) => {
	const link = (
		<Link to={'/tags/' + data.name}>{data.name}</Link>
	);

	const stats = getStats ({data});

	return (
		<div className="text-item">
			{fullMode ? (
				<h1>{link}</h1>
			) : (
				<h5>{link}</h5>
			)}

			{fullMode ? (
				<div className="stats">{
					stats.listeners + ' / ' + stats.playcount
				}</div>
			): null}
		</div>
	);
};

export default createFragmentContainer (TagPreview, graphql`
	fragment TagPreview on Tag {
		name

		artists (first: 24) {
			edges {
				node {
					stats {
						listeners
						playcount
					}
				}
			}
		}
	}`
);