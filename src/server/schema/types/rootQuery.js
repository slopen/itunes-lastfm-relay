// @flow

import Artist, {artistConnection} from 'server/schema/types/artist';
import Tag, {tagConnection} from 'server/schema/types/tag';


export default {

	async artists (variables: Object) {
		return artistConnection (
			await Artist.buildQuery (variables),
			variables
		);
	},

	async tags (variables: Object) {
		return tagConnection (
			await Tag.buildQuery (variables),
			variables
		);
	}
}