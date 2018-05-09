import MongooseTag from 'server/models/tag';

import Model from 'server/schema/types/model';

import connection from 'server/schema/connection';
import {artistConnection} from 'server/schema/types/artist';


export default class Tag extends Model {

	static MongooseModel = MongooseTag;

	async artists (variables) {
		const {artists: $in} = this._doc;
		const query = {_id: {$in}};

		return artistConnection (query, variables);
	}

	async similar (variables) {
		const {similar: $in} = this._doc;
		const query = {_id: {$in}};

		return tagConnection (query, variables);
	}

}

export const tagConnection = connection (Tag);