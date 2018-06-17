import React from 'react';

import Render from 'components/render';

import TagEditFields from './TagEditFields';
import TagEditFieldsQuery from './queries/TagEditFieldsQuery';

import TagEditArtistsAdd from './TagEditArtistsAdd';
import TagEditArtistsAddQuery from './queries/TagEditArtistsAddQuery';

import TagEditArtistsRemove from './TagEditArtistsRemove';
import TagEditArtistsRemoveQuery from './queries/TagEditArtistsRemoveQuery';


export default ({data, relay, onChange}) =>
	<form>

		<Render
			variables={{id: data.id}}
			query={TagEditFieldsQuery}
			environment={relay.environment}
			component={TagEditFields}
			componentProps={{onChange}}/>

		<fieldset>
			<div className="field">
				<label>Add Artist</label>
				<Render
					variables={{id: data.id}}
					query={TagEditArtistsAddQuery}
					environment={relay.environment}
					component={TagEditArtistsAdd}
					componentProps={{onChange}}/>
			</div>

			<div className="field">
				<label>Remove Artist</label>
				<Render
					variables={{id: data.id}}
					query={TagEditArtistsRemoveQuery}
					environment={relay.environment}
					component={TagEditArtistsRemove}
					componentProps={{onChange}}/>
			</div>
		</fieldset>

	</form>