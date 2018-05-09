// @flow

import {fromGlobalId} from 'graphql-relay';
import type {MongooseDocument} from 'mongoose';

import Artist from './artist';
import Tag from './tag';

type Entity = Class <Artist | Tag>;

const getById = (T: Entity) =>
	async (id: string) => {
		const doc: ?MongooseDocument = await T
			.MongooseModel
			.findById (id)

		if (doc) {
			return new T (doc);
		}
	}

const types = {
	Artist: getById (Artist),
	Tag: getById (Tag)
};

export default class Node {
	static fromGlobalId (globalId: string) {
		const {type, id} = fromGlobalId (globalId);

		return types [type] (id);
	}
}