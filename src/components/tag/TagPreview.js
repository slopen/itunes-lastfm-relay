// @flow

import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';

import {Link} from 'react-router-dom';
import TagEdit from './TagEdit';

import type {RelayProp} from 'react-relay';

type Stats = {|
	+listeners: ?number,
	+playcount: ?number
|};

export type TagPreviewType = {|
	id: string,
	name: string,
	+tagStats: {|
		+edges: $ReadOnlyArray<{|
			+node: {|
				+stats: Stats
			|}
		|}>
	|}
|};

type Props = {
	relay: RelayProp,
	data: TagPreviewType,
	fullMode: boolean
};

const getStats = ({data: {tagStats}}): Stats => {
	return tagStats
		? tagStats.edges.reduce ((stats, edge) => {
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


const TagPreview = ({data, fullMode, relay}: Props) => {
	const link = (
		<Link to={'/tags/' + data.name}>{data.name}</Link>
	);

	const stats = getStats ({data});

	return (
		<div className="text-item">
			{fullMode ? (
				<h1>{link} <TagEdit data={data} relay={relay}/></h1>
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
	fragment TagPreview on Tag
		@argumentDefinitions (
			count: {type: "Int", defaultValue: 12}
		) {

		id
		name

		tagStats: artists (first: $count)
		@connection (key: "TagPreview_tagStats") {
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