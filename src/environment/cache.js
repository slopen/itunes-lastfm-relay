// @flow

// TODO: remove after https://github.com/benmosher/eslint-plugin-import/pull/1057
// eslint-disable-next-line import/named
import type {RelayRequest, RelayResponse} from 'react-relay-network-modern';

const CACHE: Map <string, Promise<RelayResponse>> = new Map ();

const stableCopy = (value: mixed): mixed => {
	if (!value || typeof value !== 'object') {
		return value;
	}
	if (Array.isArray (value)) {
		return value.map (stableCopy);
	}

	const keys = Object.keys (value).sort ();
	const stable = {};

	for (let i = 0; i < keys.length; i++) {
		stable [keys[i]] = stableCopy (value [keys[i]]);
	}

	return stable;
};

const getCacheKey = (
	queryID: string,
	variables: Object
): string => {
	return JSON.stringify (
		stableCopy ({queryID, variables})
	);
}

export const cacheReady = async () => {
	const keys = Array.from (CACHE.keys ());

	for (let i = 0; i < keys.length; i++) {
		await CACHE.get (keys [i]);
		CACHE.delete (keys [i]);
	}

	await new Promise ((resolve) =>
		setTimeout (resolve, 50)
	);
};

export default {
	set (req: RelayRequest, res: Promise<RelayResponse>) {
		const {operation, variables} = req;
		const cacheKey = getCacheKey (operation.name, variables);

		CACHE.set (cacheKey, res);
	}
}