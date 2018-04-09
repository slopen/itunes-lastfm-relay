// @flow

import React, {Component} from 'react';

import ArtistPreview from './ArtistPreview';
import ReactList from 'react-list';

const artistsLimit = 24;

type Artist = {
	id: string
};

type Props = {
	data: {
		[key: 'similar' | 'artists']: {
			edges: $ReadOnlyArray<{
				node: Artist
			}>
		}
	}
};

export default class ArtistsList extends Component<Props> {
	constructor (props: Props) {
		super (props);

		(this: any).renderRow = this.renderRow.bind (this);
	}

	getList () {
		const {data: {similar, artists}} = this.props;

		return (similar || artists).edges || [];
	}

	renderRow (key: string, index: number) {
		const list = this.getList ();

		if (index === list.length - 1) {
			// this.props.relay.setVariables ({
			// 	artistsLimit: list.length + artistsLimit
			// });
		}

		const {node} = list [index];

		return (
			<div className="item" key={node.id}>
				{/* $FlowFixMe https://github.com/facebook/relay/issues/2316 */}
				<ArtistPreview data={node}/>
			</div>
		);
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