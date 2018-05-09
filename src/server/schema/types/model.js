// @flow

import {toGlobalId} from 'graphql-relay';

import type {
	MongooseDocument,
	MongooseModel
} from 'mongoose';


export default class Model {

	$key: string;
	$value: mixed;

	_doc: MongooseDocument;

	static MongooseModel: MongooseModel;

	constructor (doc: MongooseDocument) {
		this._doc = doc;

		return new Proxy (this, {
			get (target, prop) {
				if (prop === 'id') {
					return toGlobalId (
						doc.constructor.modelName,
						doc.id.toString ()
					);
				}

				return typeof target [prop] !== 'undefined'
					? target [prop]
					: (doc: Object) [prop];
			}
		});
	}
}