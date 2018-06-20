// @flow

import React from 'react';
import Render from 'components/render';

import TagEditArtists from './TagEditArtists';
import TagEditArtistsQuery from './queries/TagEditArtistsQuery';


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
		query={TagEditArtistsQuery}
		environment={relay.environment}
		component={TagEditArtists}
		componentProps={{
			onArtistAdd,
			onArtistRemove,
			onArtistSearch
		}}/>
