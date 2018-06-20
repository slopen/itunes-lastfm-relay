// @flow

import React, {Component} from 'react';
import {createPaginationContainer, graphql} from 'react-relay';
import {Link} from 'react-router-dom';

import ScrollHander from 'components/lib/scroll-handler';
import cloudStyle from 'components/lib/cloud-style';

import type {RelayPaginationProp} from 'react-relay';

export type ArtistsCloudType = {|
	+artists: ?{|
		+edges: $ReadOnlyArray<{|
			+node: {|
				+id: string,
				+name: string,
				+stats: {|
					+playcount: ?number
				|}
			|}
		|}>,
		pageInfo?: Object
	|}
|};

type Props = {
	relay: RelayPaginationProp,
	data: ArtistsCloudType
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
		const {data} = this.props;
		const {artists} = data || {};
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
	fragment ArtistsCloud on RootQuery
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
		getConnectionFromProps ({data}: Props) {
			return data && data.artists;
		},
		getVariables (props, {count, cursor}) {
			return {
				count,
				cursor
			};
		},
		query: graphql`
			query ArtistsCloudPaginationQuery (
				$count: Int!
				$cursor: String
			) {
				...ArtistsCloud @arguments (count: $count, cursor: $cursor)
			}
		`
	}
)