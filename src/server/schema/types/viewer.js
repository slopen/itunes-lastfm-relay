// @flow

import {fromGlobalId} from 'graphql-relay';

import {artistConnection} from 'server/schema/types/artist';
import {tagConnection} from 'server/schema/types/tag';

import type {ConnectionArguments} from 'graphql-relay';

type Variables = {
	name: string,
	excludeTag: string,
	excludeArtist: string
} & ConnectionArguments;

const buildArtistQuery = (variables: Variables) => {
	const query = {};

	if (!variables) {
		return query;
	}

	if (variables.name) {
		query.name = variables.name;
	}
	if (variables.excludeTag) {
		const {id} = fromGlobalId (
			variables.excludeTag
		);

		query.tags = {$nin: [id]};
	}

	return query;
}

const buildTagQuery = (variables: Variables) => {
	const query = {};

	if (!variables) {
		return query;
	}

	if (variables.name) {
		query.name = variables.name;
	}
	if (variables.excludeTag) {
		const {id} = fromGlobalId (
			variables.excludeArtist
		);

		query.artists = {$nin: [id]};
	}

	return query;
}

export default class Viewer {
	get id (): string {
		return 'viewer';
	}

	artists (variables: Variables) {
		return artistConnection (
			buildArtistQuery (variables),
			variables
		);
	}

	tags (variables: Variables) {
		return tagConnection (
			buildTagQuery (variables),
			variables
		);
	}
}