// @flow

import type {MongooseDocument} from 'mongoose';

import MongooseArtist from 'server/models/artist';

import Model from 'server/schema/types/model';

import connection from 'server/schema/connection';
import {tagConnection} from 'server/schema/types/tag';


export default class Artist extends Model {

	_doc: MongooseDocument;

	static MongooseModel = MongooseArtist;

	async similar (variables: Object) {
		const {similar: $in} = this._doc.toJSON ();
		const query: Object = {_id: {$in}};

		return artistConnection (query, variables);
	}

	async tags (variables: Object) {
		const {tags: $in} = this._doc.toJSON ();
		const query = {_id: {$in}};

		return tagConnection (query, variables);
	}

}

export const artistConnection = connection (Artist);