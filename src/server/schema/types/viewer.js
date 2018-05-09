// @flow

import {artistConnection} from 'server/schema/types/artist';
import {tagConnection} from 'server/schema/types/tag';

import type {ConnectionArguments} from 'graphql-relay';

type Variables = {name: string} & ConnectionArguments;


export default class Viewer {
	get id (): string {
		return 'viewer';
	}

	async artists (variables: Variables) {
		const {name} = variables;
		const query = name ? {name} : {};

		return artistConnection (query, variables);
	}

	async tags (variables: Variables) {
		const {name} = variables;
		const query = name ? {name} : {};

		return tagConnection (query, variables);
	}
}