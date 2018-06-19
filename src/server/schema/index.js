// @flow

import Viewer from 'server/schema/types/viewer';
import Node from 'server/schema/types/node';
import mutations from 'server/schema/mutations';

export {default as schema} from './schema';

type NodeVariables = {
	id: string
};

type RootValueType = {
	node: typeof node,
	viewer: typeof viewer,
	[key: string]: Function
};

const node = ({id}: NodeVariables) => {
	if (!id) {
		throw new Error ('node ID is required');
	}

	return Node.fromGlobalId (id);
};

const viewer = () => new Viewer ();


export const rootValue = ({
	node,
	viewer,
	...mutations
}: RootValueType)

