// @flow

import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';

import {Link} from 'react-router-dom';

type Stats = {|
	+listeners: ?number,
	+playcount: ?number
|};

export type TagPreviewType = {|
	+name: string,
	+artists: {|
		+edges: $ReadOnlyArray<{|
			+node: {|
				+stats: Stats
			|}
		|}>
	|}
|};

type Props = {
	data: TagPreviewType,
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

const TagStats = ({stats: {
	listeners,
	playcount
}}: {stats: Stats}) =>
	<div className="stats">{
		`${listeners || 0} / ${playcount || 0}`
	}</div>

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
				<TagStats stats={stats}/>
			): null}
		</div>
	);
};

export default createFragmentContainer (TagPreview, graphql`
	fragment TagPreview on Tag {
		name

		artists (first: 5) {
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