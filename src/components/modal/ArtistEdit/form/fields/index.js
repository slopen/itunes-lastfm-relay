// @flow

import React from 'react';
import Render from 'components/render';

import ArtistEditFields from './ArtistEditFields';
import ArtistEditFieldsQuery from './queries/ArtistEditFieldsQuery';

import type {RelayProp} from 'react-relay';

type Props = {
	relay: RelayProp,
	data: {id: string},
	onChange: (data: Object) => void
};


export default ({relay, data, onChange}: Props) =>
	<Render
		variables={{id: data.id}}
		query={ArtistEditFieldsQuery}
		environment={relay.environment}
		component={ArtistEditFields}
		componentProps={{onChange}}/>
