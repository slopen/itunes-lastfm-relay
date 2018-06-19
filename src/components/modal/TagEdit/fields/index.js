// @flow

import React from 'react';

import Render from 'components/render';

import TagEditFields from './TagEditFields';
import TagEditFieldsQuery from './queries/TagEditFieldsQuery';

import TagEditArtistsAdd from './TagEditArtistsAdd';
import TagEditArtistsAddQuery from './queries/TagEditArtistsAddQuery';

import TagEditArtistsRemove from './TagEditArtistsRemove';
import TagEditArtistsRemoveQuery from './queries/TagEditArtistsRemoveQuery';

import type {RelayProp} from 'react-relay';

type Props = {
	data: {id: string},
	relay: RelayProp,
	onArtistAdd: (id: string) => void,
	onArtistRemove: (id: string) => void,
	onFieldChange: (data: Object) => void
};


export default ({
	data,
	relay,
	onFieldChange,
	onArtistAdd,
	onArtistRemove
}: Props) =>
	<form>

		<Render
			variables={{id: data.id}}
			query={TagEditFieldsQuery}
			environment={relay.environment}
			component={TagEditFields}
			componentProps={{onChange: onFieldChange}}/>

		<fieldset>
			<div className="field">
				<label>Add Artist</label>
				<Render
					variables={{id: data.id}}
					query={TagEditArtistsAddQuery}
					environment={relay.environment}
					component={TagEditArtistsAdd}
					componentProps={{onChange: onArtistAdd}}/>
			</div>

			<div className="field">
				<label>Remove Artist</label>
				<Render
					variables={{id: data.id}}
					query={TagEditArtistsRemoveQuery}
					environment={relay.environment}
					component={TagEditArtistsRemove}
					componentProps={{onChange: onArtistRemove}}/>
			</div>
		</fieldset>

	</form>