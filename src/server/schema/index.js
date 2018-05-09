// @flow

import Viewer from 'server/schema/types/viewer';
import Node from 'server/schema/types/node';


export {default as schema} from './schema';

export const rootValue = {
	node ({id}) {
		if (!id) {
			throw new Error ('node ID is required');
		}

		return Node.fromGlobalId (id);
	},

	viewer () {
		return new Viewer ();
	}
}

