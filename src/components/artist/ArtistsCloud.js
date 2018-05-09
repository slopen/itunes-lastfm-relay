// @flow

import React, {Component} from 'react';
import {createPaginationContainer, graphql} from 'react-relay';
import {Link} from 'react-router-dom';

import ScrollHander from 'components/lib/scroll-handler';
import cloudStyle from 'components/lib/cloud-style';

import type {RelayPaginationProp} from 'react-relay';

export type ArtistsCloudFragment = {|
	+artists: ?{|
		+edges: $ReadOnlyArray<{|
			+node: {|
				+id: string,
				+name: string,
				+stats: {|
					+playcount: ?number
				|}
			|}
		|}>
	|}
|};

type Props = {
	relay: RelayPaginationProp,
	viewer: ArtistsCloudFragment
};


class ArtistsCloud extends Component<Props> {

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
		const {artists} = viewer || {};
		const {edges} = artists || {};

		if (!edges || !edges.length) {
			return null;
		}

		return (
			<div className="text-center">
				<ul className="list-inline cloud">
					{edges.map (({node}, index) =>
						<li key={node.id}
							style={cloudStyle (node.stats && node.stats.playcount, index)}>
							<Link to={'/artists/' + node.name}>{node.name}</Link>
						</li>
					)}
				</ul>
				<ScrollHander onScrollEnd={this.loadMore}/>
			</div>
		);
	}
}

export default createPaginationContainer (ArtistsCloud, graphql`
	fragment ArtistsCloud_viewer on Viewer
		@argumentDefinitions (
			count: {type: "Int", defaultValue: 100}
			cursor: {type: "String"}
		) {

		artists (
			first: $count
			after: $cursor
		) @connection (key: "ArtistsCloud_artists") {
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
	}`,
	{
		direction: 'forward',
		getConnectionFromProps ({viewer}) {
			return viewer && viewer.artists;
		},
		getVariables (props, {count, cursor}) {

			return {
				count,
				cursor
			};
		},
		query: graphql`
			query ArtistsCloudRefetchQuery (
				$count: Int!
				$cursor: String
			) {
				viewer {
					...ArtistsCloud_viewer @arguments (count: $count, cursor: $cursor)
				}
			}
		`
	}
)