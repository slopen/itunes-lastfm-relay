// @flow

import React, {Component} from 'react';

import ArtistPreview from './ArtistPreview';
import ReactList from 'react-list';

import type {RelayPaginationProp} from 'react-relay';


type Artist = {
	id: string
};

type Props = {
	relay: RelayPaginationProp,
	data: {
		[key: 'artistSimilar' | 'tagArtists']: {
			edges: $ReadOnlyArray<{
				node: Artist
			}>
		}
	}
};

const artistsLimit = 12;

export default class ArtistsList extends Component<Props> {
	constructor (props: Props) {
		super (props);

		(this: any).renderRow = this.renderRow.bind (this);
		(this: any).loadMore = this.loadMore.bind (this);
	}

	getList () {
		const {data: {artistSimilar, tagArtists}} = this.props;

		return (artistSimilar || tagArtists).edges || [];
	}

	renderRow (key: string, index: number) {
		const list = this.getList ();

		if (index === list.length - 1) {
			this.loadMore ();
		}

		const {node} = list [index];

		return (
			<div className="item" key={node.id}>
				{/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
				<ArtistPreview data={node}/>
			</div>
		);
	}

	loadMore () {
		const {relay} = this.props;

		if (!relay.hasMore () || relay.isLoading ()) {
			return;
		}

		relay.loadMore (12, (error) => {
			if (error) {
				console.error ('pagination fetch error:', error);
			}
		});
	}

	render () {
		const list = this.getList ();

		return (
			<div className="media-list">
				<ReactList
					axis={'y'}
					itemRenderer={this.renderRow}
					minSize={artistsLimit}
					length={list.length}/>
			</div>
		);
	}
}