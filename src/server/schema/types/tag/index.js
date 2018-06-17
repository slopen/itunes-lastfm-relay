// @flow

import type {MongooseDocument} from 'mongoose';
import type {ConnectionArguments} from 'graphql-relay';

import MongooseTag from 'server/models/tag';

import Model from 'server/schema/types/model';

import connection from 'server/schema/connection';
import {artistConnection} from 'server/schema/types/artist';


export default class Tag extends Model {

	_doc: MongooseDocument;

	static MongooseModel = MongooseTag;

	async artists (variables: ConnectionArguments) {
		const {artists: $in} = this._doc.toJSON ();
		const query = {_id: {$in}};

		return artistConnection (query, variables);
	}
}

export const tagConnection = connection (Tag);