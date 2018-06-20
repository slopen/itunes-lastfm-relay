// @flow

import Node from 'server/schema/types/node';
import rootQuery from 'server/schema/types/rootQuery';
import mutations from 'server/schema/mutations';

export {default as schema} from './schema';

type NodeVariables = {
	id: string
};

type RootValueType = {
	node: typeof node,
	[key: string]: Function
};

const node = ({id}: NodeVariables) => {
	if (!id) {
		throw new Error ('node ID is required');
	}

	return Node.fromGlobalId (id);
};


export const rootValue = ({
	node,
	...rootQuery,
	...mutations
}: RootValueType)

