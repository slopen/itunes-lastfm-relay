// @flow

import {artistConnection} from 'server/schema/types/artist';
import {tagConnection} from 'server/schema/types/tag';


export default class Viewer {
	get id (): string {
		return 'viewer';
	}

	async artists (variables) {
		const {name} = variables;
		const query = name ? {name} : {};

		return artistConnection (query, variables);
	}

	async tags (variables) {
		const {name} = variables;
		const query = name ? {name} : {};

		return tagConnection (query, variables);
	}
}