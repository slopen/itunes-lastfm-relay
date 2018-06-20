// @flow

import React from 'react';
import Render from 'components/render';

import ArtistEditSimilar from './ArtistEditSimilar';
import ArtistEditSimilarQuery from './queries/ArtistEditSimilarQuery';


import type {RelayProp} from 'react-relay';

export type Props = {
	data: {id: string},
	relay: RelayProp,
	onArtistAdd: (id: string) => void,
	onArtistRemove: (id: string) => void,
	onArtistSearch: (term: string) => void
};


export default ({
	data,
	relay,
	onArtistAdd,
	onArtistRemove,
	onArtistSearch
}: Props) =>
	<Render
		variables={{id: data.id}}
		query={ArtistEditSimilarQuery}
		environment={relay.environment}
		component={ArtistEditSimilar}
		componentProps={{
			onArtistAdd,
			onArtistRemove,
			onArtistSearch
		}}/>
