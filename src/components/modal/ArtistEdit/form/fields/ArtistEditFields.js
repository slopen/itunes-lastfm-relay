// @flow

import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';

import Fieldset from 'components/lib/fieldset';

import type {RelayProp} from 'react-relay';

type ArtistData = {
	name: string,
	bio: {
		summary: string
	}
};

type Props = {
	data: ArtistData,
	relay: RelayProp,
	onChange: (Object) => void
};

const fields = [
	'name',
	'bio'
];

const ArtistEditFields = (props: Props) =>
	<Fieldset {...props} fields={fields}/>


export default createFragmentContainer (ArtistEditFields, graphql`
	fragment ArtistEditFields on Artist {
		id
		name
		bio {
			summary
		}
	}`
);