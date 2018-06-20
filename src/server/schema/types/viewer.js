// @flow

import {fromGlobalId} from 'graphql-relay';

import {artistConnection} from 'server/schema/types/artist';
import {tagConnection} from 'server/schema/types/tag';
import nameregex from 'server/schema/util/nameregex';

import type {ConnectionArguments} from 'graphql-relay';

type Variables = {
	name: string,
	search: string,
	excludeTag: string,
	excludeArtist: string
} & ConnectionArguments;

const buildArtistQuery = (variables: Variables) => {
	const query = {};

	if (!variables) {
		return query;
	}

	if (variables.excludeTag) {
		const {id} = fromGlobalId (
			variables.excludeTag
		);

		query.tags = {$nin: [id]};
	}

	if (variables.name) {
		query.name = variables.name;
	} else if (variables.search) {
		query.name = {
			$regex: nameregex (variables.search)
		};
	}

	return query;
}

const buildTagQuery = (variables: Variables) => {
	const query = {};

	if (!variables) {
		return query;
	}

	if (variables.excludeArtist) {
		const {id} = fromGlobalId (
			variables.excludeArtist
		);

		query.artists = {$nin: [id]};
	}

	if (variables.name) {
		query.name = variables.name;
	} else if (variables.search) {
		query.name = {
			$regex: nameregex (variables.search)
		};
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