import uuid from 'uuid';
import {Environment, RecordSource, Store} from 'relay-runtime';

import {
	RelayNetworkLayer,
	urlMiddleware,
	batchMiddleware,
	retryMiddleware,
	cacheMiddleware
} from 'react-relay-network-modern';

import {getCacheKey} from 'react-relay-network-modern-ssr/lib/utils';

const cache = new Map ();

const network = new RelayNetworkLayer ([

	cacheMiddleware ({
		size: 100,
		ttl: 900000
	}),

	(next) => async (req) => {
		req.fetchOpts.headers ['X-Request-ID'] = uuid.v4 ();
		req.fetchOpts.credentials = 'include';

		const cacheKey = getCacheKey (
			req.operation.name,
			req.variables
		);

		cache.set (cacheKey, next (req));

		return await cache.get (cacheKey);
	},

	urlMiddleware ({
		url: () => Promise.resolve (
			'https://itunes-lastfm-relay/graphql'
		)
	}),

	batchMiddleware ({
		batchUrl: () => Promise.resolve (
			'https://itunes-lastfm-relay/graphql/batch'
		),
		batchTimeout: 10
	}),

	retryMiddleware ({
		fetchTimeout: 15000,
		retryDelays: (attempt) => Math.pow (2, attempt + 4) * 100,
		statusCodes: [500, 503, 504]
	})

]);

export const cacheReady = async () => {
	const keys = Array.from (cache.keys ());

	for (let i = 0; i < keys.length; i++) {
		await cache.get (keys [i]);
	}
};


const records = typeof window !== 'undefined'
	? window._preloaded : null;

export const store = new Store (new RecordSource (records));
export default new Environment ({network, store});