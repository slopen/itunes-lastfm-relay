// @flow

import React from 'react';

import TagEditFields from './fields';
import TagEditArtists from './artists';


import type {RelayProp} from 'react-relay';

type Props = {
	data: {id: string},
	relay: RelayProp,
	onFieldChange: (data: Object) => void,
	onArtistAdd: (id: string) => void,
	onArtistRemove: (id: string) => void,
	onArtistSearch: (term: string) => void
};


export default ({
	data,
	relay,
	onFieldChange,
	onArtistAdd,
	onArtistRemove,
	onArtistSearch
}: Props) =>
	<form>
		<TagEditFields
			data={data}
			relay={relay}
			onChange={onFieldChange}/>

		<TagEditArtists
			data={data}
			relay={relay}
			onArtistAdd={onArtistAdd}
			onArtistRemove={onArtistRemove}
			onArtistSearch={onArtistSearch}/>
	</form>