// @flow

import React, {Component} from 'react';
import {createPaginationContainer, graphql} from 'react-relay';

import {Link} from 'react-router-dom';

import ScrollHander from 'components/lib/scroll-handler';
import cloudStyle from 'components/lib/cloud-style';

export type TagsCloudType = {|
	+tags: ?{|
		+edges: $ReadOnlyArray<{|
			+node: {|
				+name: string,
				+artists: {|
					+edges: $ReadOnlyArray<{|
						+node: {|
							+stats: {|
								+playcount: ?number
							|}
						|}
					|}>
				|}
			|}
		|}>
	|}
|};

import type {RelayPaginationProp} from 'react-relay';

type Props = {
	relay: RelayPaginationProp,
	viewer: TagsCloudType
};


const style = (node, index) => cloudStyle (
	node
		.artists
		.edges
		.reduce ((prev, {node: {stats}}) =>
			prev + (stats
				? Number (stats.playcount)
				: 0
			),
		0),
	index
)

class TagsCloud extends Component<Props> {

	constructor (props: Props) {
		super (props);

		(this: any).loadMore = this.loadMore.bind (this);
	}

	loadMore () {
		const {relay} = this.props;

		if (!relay.hasMore () || relay.isLoading ()) {
			return;
		}

		relay.loadMore (25, (error) => {
			if (error) {
				console.error ('pagination fetch error:', error);
			}
		});
	}

	render () {
		const {viewer} = this.props;
		const {tags} = viewer || {};
		const {edges} = tags || {};

		if (!edges || !edges.length) {
			return null;
		}

		return (
			<ul className="list-inline cloud lowercase">
				{edges.map (({node}, index) =>
					<li key={node.name}
						style={style (node, index)}>

						<Link to={'/tags/' + node.name}>
							{node.name}
						</Link>
					</li>
				)}
				<ScrollHander onScrollEnd={this.loadMore}/>
			</ul>
		);
	}
}

export default createPaginationContainer (TagsCloud, graphql`
	fragment TagsCloud_viewer on Viewer
		@argumentDefinitions (
			count: {type: "Int", defaultValue: 100}
			cursor: {type: "String"}
		) {

		tags (
			first: $count
			after: $cursor
		) @connection (key: "TagsCloud_tags") {
			edges {
				node {
					...on Tag {
						name
						artists (first: 5) {
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
	}`,
	{
		direction: 'forward',
		getConnectionFromProps ({viewer}) {
			return viewer && viewer.tags;
		},
		getVariables (props, {count, cursor}) {

			return {
				count,
				cursor
			};
		},
		query: graphql`
			query TagsCloudPaginationQuery (
				$count: Int!
				$cursor: String
			) {
				viewer {
					...TagsCloud_viewer @arguments (count: $count, cursor: $cursor)
				}
			}
		`
	}
)