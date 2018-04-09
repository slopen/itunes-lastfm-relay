// @flow
import {GraphQLSchema} from 'graphql';

declare module '@risingstack/graffiti-mongoose' {
	import type {MongooseDocument} from 'mongoose';

	declare export type getSchemaOptions = {
		mutation: boolean,
		allowMongoIDMutation: boolean
	};

	declare export function getSchema (
		Class <MongooseDocument> [],
		getSchemaOptions
	): GraphQLSchema;
}