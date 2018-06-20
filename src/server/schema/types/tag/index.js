// @flow

import {fromGlobalId} from 'graphql-relay';

import MongooseTag from 'server/models/tag';
import Model from 'server/schema/types/model';

import connection from 'server/schema/connection';
import {artistConnection} from 'server/schema/types/artist';
import nameregex from 'server/schema/util/nameregex';

import type {ConnectionArguments} from 'graphql-relay';
import type {TagMongooseDoc} from 'server/models/tag';

type Variables = {
	name: string,
	search: string,
} & ConnectionArguments;


export default class Tag extends Model {

	_doc: TagMongooseDoc;


	static MongooseModel = MongooseTag;


	static async updateTag (globalTagId: string, data: Object) {
		const {id: _id} = fromGlobalId (globalTagId);

		// $FlowFixMe mongoose query extends promise returns MongooseDocument
		const tag: TagMongooseDoc = await this.MongooseModel
			.findOneAndUpdate ({_id}, data, {new: true});

		return new this (tag);
	}

	static async addArtist (globalTagId: string, globalArtistId: string) {
		const {id: tagId} = fromGlobalId (globalTagId);
		const {id: artistId} = fromGlobalId (globalArtistId);

		// $FlowFixMe mongoose query extends promise returns MongooseDocument
		const tag: TagMongooseDoc = await this.MongooseModel.findById (tagId);

		if (!tag) {
			throw new Error (`tag not found by ${globalTagId}`);
		}

		const {artists} = tag;
		const index = artists.findIndex ((id) =>
			id.toString () === artistId
		);

		if (index !== -1) {
			throw new Error (`artist already in connection ${globalTagId}`);
		}

		tag.artists.push (artistId);

		return new this (await tag.save ());
	}

	static async removeArtist (globalTagId: string, globalArtistId: string) {
		const {id: tagId} = fromGlobalId (globalTagId);
		const {id: artistId} = fromGlobalId (globalArtistId);

		// $FlowFixMe mongoose query extends promise returns MongooseDocument
		const tag: TagMongooseDoc = await this.MongooseModel.findById (tagId);

		if (!tag) {
			throw new Error (`tag not found by ${globalTagId}`);
		}

		const {artists} = tag;
		const index = artists.findIndex ((id) =>
			id.toString () === artistId
		);

		if (index === -1) {
			throw new Error (`artist missing in connection ${globalTagId}`);
		}

		tag.artists.splice (index, 1);

		return new this (await tag.save ());
	}


	async artists (variables: Variables) {
		const query = {};
		const {artists: $in} = this._doc;

		query._id = {$in};

		if (variables.search) {
			query.name = {
				$regex: nameregex (variables.search)
			};
		}

		return artistConnection (query, variables);
	}
}

export const tagConnection = connection (Tag);