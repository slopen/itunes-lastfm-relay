// @flow

import React from 'react';

import ArtistEditFields from './fields';
import ArtistEditSimilar from './similar';


import type {RelayProp} from 'react-relay';

type Props = {
	data: {id: string},
	relay: RelayProp,
	onFieldChange: (data: Object) => void,
	onSimilarAdd: (id: string) => void,
	onSimilarRemove: (id: string) => void,
	onSimilarSearch: (term: string) => void
};


export default ({
	data,
	relay,
	onFieldChange,
	onSimilarAdd,
	onSimilarRemove,
	onSimilarSearch
}: Props) =>
	<form>
		<ArtistEditFields
			data={data}
			relay={relay}
			onChange={onFieldChange}/>

		<ArtistEditSimilar
			data={data}
			relay={relay}
			onArtistAdd={onSimilarAdd}
			onArtistRemove={onSimilarRemove}
			onArtistSearch={onSimilarSearch}/>
	</form>