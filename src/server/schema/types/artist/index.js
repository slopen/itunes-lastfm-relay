// @flow

import {fromGlobalId} from 'graphql-relay';

import MongooseArtist from 'server/models/artist';
import Model from 'server/schema/types/model';

import connection from 'server/schema/connection';
import {tagConnection} from 'server/schema/types/tag';
import nameregex from 'server/schema/util/nameregex';

import type {ConnectionArguments} from 'graphql-relay';
import type {ArtistMongooseDoc} from 'server/models/artist';

type Variables = {
	name: string,
	search: string,
	excludeTag: string,
	excludeSimilar: string
} & ConnectionArguments;


export default class Artist extends Model {

	_doc: ArtistMongooseDoc;

	static MongooseModel = MongooseArtist;

	static async buildQuery (variables: Variables) {
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

		if (variables.excludeSimilar) {
			const artist: ArtistMongooseDoc = await this.getById (
				variables.excludeSimilar
			);

			query.similar = {$nin: [artist._id]};
			query._id = {$nin: [artist._id, ...artist.similar]};
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

	static async getById (globalArtistId: string) {
		const {id: artistId} = fromGlobalId (globalArtistId);
		// $FlowFixMe mongoose query extends promise returns MongooseDocument
		const artist: ArtistMongooseDoc = await this.MongooseModel.findById (artistId);

		if (!artist) {
			throw new Error (`artist not found by ${globalArtistId}`);
		}

		return artist;
	}

	static async updateArtist (globalArtistId: string, data: Object) {
		const {id: _id} = fromGlobalId (globalArtistId);
		// $FlowFixMe mongoose query extends promise returns MongooseDocument
		const artist: ArtistMongooseDoc = await this.MongooseModel
			.findOneAndUpdate ({_id}, data, {new: true});

		return new this (artist);
	}

	static async addTag (globalArtistId: string, globalTagId: string) {
		const {id: tagId} = fromGlobalId (globalTagId);
		const artist: ArtistMongooseDoc = await this.getById (globalArtistId);

		const {tags} = artist;
		const index = tags.findIndex ((id) =>
			id.toString () === tagId
		);

		if (index !== -1) {
			throw new Error (`tag already in connection ${globalArtistId}`);
		}

		artist.tags.push (tagId);

		return new this (await artist.save ());
	}

	static async removeTag (globalArtistId: string, globalTagId: string) {
		const {id: tagId} = fromGlobalId (globalTagId);
		const artist: ArtistMongooseDoc = await this.getById (globalArtistId);

		const {tags} = artist;
		const index = tags.findIndex ((id) =>
			id.toString () === tagId
		);

		if (index === -1) {
			throw new Error (`tag missing in connection ${globalArtistId}`);
		}

		artist.tags = artist.tags.filter ((id) =>
			id.toString () === tagId
		);

		return new this (await artist.save ());
	}


	async similar (variables: Variables) {
		const {similar: $in} = this._doc;

		const query: Object = {$or: [
			{_id: {$in, $nin: [this._doc._id]}},
			{similar: {$in: [this._doc._id]}}
		]};

		if (variables.search) {
			query.name = {
				$regex: nameregex (variables.search)
			};
		}

		return artistConnection (query, variables);
	}

	async tags (variables: ConnectionArguments) {
		const {tags: $in} = this._doc;
		const query = {_id: {$in}};

		return tagConnection (query, variables);
	}

}

export const artistConnection = connection (Artist);