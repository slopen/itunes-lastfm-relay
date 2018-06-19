// @flow

import {fromGlobalId} from 'graphql-relay';

import MongooseArtist from 'server/models/artist';
import Model from 'server/schema/types/model';

import connection from 'server/schema/connection';
import {tagConnection} from 'server/schema/types/tag';

import type {ConnectionArguments} from 'graphql-relay';
import type {ArtistMongooseDoc} from 'server/models/artist';


export default class Artist extends Model {

	_doc: ArtistMongooseDoc;

	static MongooseModel = MongooseArtist;

	static async updateArtist (globalArtistId: string, data: Object) {
		const {id: _id} = fromGlobalId (globalArtistId);
		// $FlowFixMe mongoose query extends promise returns MongooseDocument
		const artist: ArtistMongooseDoc = await this.MongooseModel
			.findOneAndUpdate ({_id}, data, {new: true});

		return new this (artist);
	}

	static async addTag (globalArtistId: string, globalTagId: string) {
		const {id: tagId} = fromGlobalId (globalTagId);
		const {id: artistId} = fromGlobalId (globalArtistId);
		// $FlowFixMe mongoose query extends promise returns MongooseDocument
		const artist: ArtistMongooseDoc = await this.MongooseModel.findById (artistId);

		if (!artist) {
			throw new Error (`tag not found by ${globalArtistId}`);
		}

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
		const {id: artistId} = fromGlobalId (globalArtistId);
		// $FlowFixMe mongoose query extends promise returns MongooseDocument
		const artist: ArtistMongooseDoc = await this.MongooseModel.findById (artistId);

		if (!artist) {
			throw new Error (`tag not found by ${globalArtistId}`);
		}

		const {tags} = artist;
		const index = tags.findIndex ((id) =>
			id.toString () === tagId
		);

		if (index === -1) {
			throw new Error (`tag missing in connection ${globalArtistId}`);
		}

		artist.tags.splice (index, 1);

		return new this (await artist.save ());
	}


	async similar (variables: ConnectionArguments) {
		const {similar: $in} = this._doc;
		const query: Object = {_id: {$in}};

		return artistConnection (query, variables);
	}

	async tags (variables: ConnectionArguments) {
		const {tags: $in} = this._doc;
		const query = {_id: {$in}};

		return tagConnection (query, variables);
	}

}

export const artistConnection = connection (Artist);