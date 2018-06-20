// @flow

import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';

import Fieldset from 'components/lib/fieldset';

import type {RelayProp} from 'react-relay';

type TagData = {
	name: string
};

type Props = {
	data: TagData,
	relay: RelayProp,
	onChange: (Object) => void
};

const fields = [
	'name'
];

const TagEditFields = (props: Props) =>
	<Fieldset {...props} fields={fields}/>


export default createFragmentContainer (TagEditFields, graphql`
	fragment TagEditFields on Tag {
		id
		name
	}`
);