// @flow

import React, {Component} from 'react';
import ReactList from 'react-list';

import type {Element} from 'react';
import type {RelayPaginationProp} from 'react-relay';


export type ArtistType = {
	id: string
};

export type Props = {
	relay: RelayPaginationProp,
	limit: number,
	list: $ReadOnlyArray <Object>,
	renderRow: (Object) => Element <*>
};

export default class RelayList extends Component<Props> {

	constructor (props: Props) {
		super (props);

		(this: any).renderRow = this.renderRow.bind (this);
		(this: any).loadMore = this.loadMore.bind (this);
	}

	loadMore () {
		const {relay, limit} = this.props;

		if (!relay.hasMore () || relay.isLoading ()) {
			return;
		}

		relay.loadMore (limit, (error) => {
			if (error) {
				console.error ('pagination fetch error:', error);
			}
		});
	}

	renderRow (index: number) {
		const {list, renderRow} = this.props;

		if (index === list.length - 1) {
			this.loadMore ();
		}

		return renderRow (list [index]);
	}

	render () {
		const {
			list,
			limit
		} = this.props;

		return (
			<div className="media-list">
				<ReactList
					type="uniform"
					length={list.length}
					minSize={limit}
					pageSize={limit}
					itemRenderer={this.renderRow}/>
			</div>
		);
	}
}