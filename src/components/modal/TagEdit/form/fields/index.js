// @flow

import React from 'react';
import Render from 'components/render';

import TagEditFields from './TagEditFields';
import TagEditFieldsQuery from './queries/TagEditFieldsQuery';

import type {RelayProp} from 'react-relay';

type Props = {
	relay: RelayProp,
	data: {id: string},
	onChange: (data: Object) => void
};


export default ({relay, data, onChange}: Props) =>
	<Render
		variables={{id: data.id}}
		query={TagEditFieldsQuery}
		environment={relay.environment}
		component={TagEditFields}
		componentProps={{onChange}}/>
