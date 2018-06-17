// @flow

import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';

import ArtistImage from './ArtistImage';

import type {Element} from 'react';
import type {ArtistImageType} from './ArtistImage';

export type ArtistSelectItemType = {
	id: string,
	name: string,
	...$Exact<ArtistImageType>
};

type Props = {
	data: ArtistSelectItemType,
	onAction: (id: string) => void,
	actionIcon: Element <*>
};


const ArtistSelectItem = ({data, onAction, actionIcon}: Props) =>
	<div className="select-item">
		<div className="item-image">
			<ArtistImage data={data} size="small"/>
		</div>

		<div className="item-info">
			<h4>{data.name}</h4>
		</div>

		<a
			href="#"
			className="item-action"
			onClick={(e: Event) => {
				onAction (data.id);
				e.preventDefault ();
			}}>

			{actionIcon}
		</a>
	</div>

export default createFragmentContainer (ArtistSelectItem, graphql`
	fragment ArtistSelectItem on Artist {
		id
		name
		...ArtistImage
	}`
)