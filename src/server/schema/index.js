// @flow

import Viewer from 'server/schema/types/viewer';
import Node from 'server/schema/types/node';
import mutations from 'server/schema/mutations';

export {default as schema} from './schema';

type NodeVariables = {
	id: string
};

export const rootValue = {
	node ({id}: NodeVariables) {
		if (!id) {
			throw new Error ('node ID is required');
		}

		return Node.fromGlobalId (id);
	},

	viewer () {
		return new Viewer ();
	},

	...mutations
}

