// @flow

import {toGlobalId} from 'graphql-relay';

import type {MongooseDocument} from 'mongoose';

interface iModel {
	[key: string]: mixed
}

type Doc = MongooseDocument & iModel;


export default class Model implements iModel {

	$key: string;
	$value: mixed;

	_doc: Doc;

	constructor (doc: Doc) {
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
					: doc [prop];
			}
		});
	}
}