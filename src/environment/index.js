// @flow
import uuid from 'uuid';

import {
	Store,
	RecordSource,
	Environment
} from 'relay-runtime';

import {
	RelayNetworkLayer,
	urlMiddleware,
	batchMiddleware,
	retryMiddleware,
	cacheMiddleware,
	RelayNetworkLayerRequest
} from 'react-relay-network-modern';

// TODO: remove after https://github.com/benmosher/eslint-plugin-import/pull/1057
// eslint-disable-next-line import/named
import type {RelayResponse} from 'react-relay-network-modern';
import type {RecordSource as RecordSourceType} from 'relay-runtime';

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
}

const getCacheKey = (queryID: string, variables: Object): string => {
	return JSON.stringify (stableCopy ({queryID, variables}));
}


const url = 'https://itunes-lastfm-relay/graphql';
const batchUrl = 'https://itunes-lastfm-relay/graphql/batch';

const cache: Map <string, Promise<RelayResponse>> = new Map ();

const network = new RelayNetworkLayer ([

	cacheMiddleware ({
		size: 100,
		ttl: 900000
	}),

	(next) => async (req) => {
		req.fetchOpts.headers ['X-Request-ID'] = uuid.v4 ();
		req.fetchOpts.credentials = 'include';

		const res = next (req);

		if (req instanceof RelayNetworkLayerRequest) {
			const {operation, variables} = req;
			const cacheKey = getCacheKey (operation.name, variables);

			cache.set (cacheKey, res);
		}

		return await res;
	},

	urlMiddleware ({url}),

	batchMiddleware ({
		batchUrl,
		batchTimeout: 10
	}),

	retryMiddleware ({
		fetchTimeout: 15000,
		retryDelays: (attempt: number) => Math.pow (2, attempt + 4) * 100,
		statusCodes: [500, 503, 504]
	})

]);

export const cacheReady = async () => {
	const keys = Array.from (cache.keys ());

	for (let i = 0; i < keys.length; i++) {
		await cache.get (keys [i]);
		cache.delete (keys [i]);
	}
};


const preloaded: ?RecordSourceType = typeof window !== 'undefined'
	? window._preloaded : null;
const recordSource = preloaded
	? new RecordSource (preloaded)
	: new RecordSource ();

const store = new Store (recordSource);
const environment = new Environment ({network, store});

export default environment;
