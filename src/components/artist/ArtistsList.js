import React, {Component} from 'react';

import ArtistPreview from './ArtistPreview';
import ReactList from 'react-list';


export default class ArtistsList extends Component {
	constructor (props) {
		super (props);

		this.renderRow = this.renderRow.bind (this);
	}

	getList () {
		const {data: {similar, artists}} = this.props;

		return (similar || artists).edges || [];
	}

	renderRow (key, index) {
		const list = this.getList();

		if (index === list.length - 1) {
			// this.props.relay.setVariables ({
			// 	artistsLimit: list.length + artistsLimit
			// });
		}

		var artist = list [index].node;

		return (
			<div className="item" key={artist.id}>
				<ArtistPreview data={artist}/>
			</div>
		);
	}

	render () {
		const list = this.getList ();

		return (
			<div className="media-list">
				<ReactList
					itemRenderer={this.renderRow}
					length={list.length }/>
			</div>
		);
	}
}