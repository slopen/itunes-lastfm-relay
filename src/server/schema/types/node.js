// @flow

import {fromGlobalId} from 'graphql-relay';

import Artist from './artist';
import Tag from './tag';


const getById = (T) => async (id) =>
	new T (await T.MongooseModel.findById (id));

const types = {
	Artist: getById (Artist),
	Tag: getById (Tag)
};

export default class Node {
	static fromGlobalId (globalId) {
		const {type, id} = fromGlobalId (globalId);

		return types [type] (id);
	}
}