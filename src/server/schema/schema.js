// @flow

import {buildSchema, GraphQLInterfaceType} from 'graphql';
import source from '../../../data/schema.graphql';

const schema = buildSchema (source);
const SchemaNodeInterface = schema.getType ('Node');

if (SchemaNodeInterface instanceof GraphQLInterfaceType) {
	SchemaNodeInterface.resolveType = /* $FlowFixMe graphql types */
		(doc) => schema.getType (doc.constructor.name);
}

export default schema;
