// @flow

import type {MongooseDocument} from 'mongoose';
import type {ConnectionArguments} from 'graphql-relay';

import MongooseArtist from 'server/models/artist';

import Model from 'server/schema/types/model';

import connection from 'server/schema/connection';
import {tagConnection} from 'server/schema/types/tag';


export default class Artist extends Model {

	_doc: MongooseDocument;

	static MongooseModel = MongooseArtist;

	async similar (variables: ConnectionArguments) {
		const {similar: $in} = this._doc.toJSON ();
		const query: Object = {_id: {$in}};

		return artistConnection (query, variables);
	}

	async tags (variables: ConnectionArguments) {
		const {tags: $in} = this._doc.toJSON ();
		const query = {_id: {$in}};

		return tagConnection (query, variables);
	}

}

export const artistConnection = connection (Artist);