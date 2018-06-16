// @flow

import uuid from 'uuid';

import {
	RelayNetworkLayer,
	urlMiddleware,
	batchMiddleware,
	retryMiddleware,
	cacheMiddleware,
	RelayNetworkLayerRequest
} from 'react-relay-network-modern';

import cache from './cache';

import type {RelayResponse} from 'react-relay-network-modern';


const url = 'https://itunes-lastfm-relay/graphql';
const batchUrl = 'https://itunes-lastfm-relay/graphql/batch';


export default new RelayNetworkLayer ([

	cacheMiddleware ({
		size: 100,
		ttl: 900000
	}),

	(next) => async (req) => {
		req.fetchOpts.headers ['x-request-id'] = uuid.v4 ();
		req.fetchOpts.credentials = 'include';

		const res: Promise <RelayResponse> = next (req);

		if (req instanceof RelayNetworkLayerRequest) {
			cache.set (req, res);
		}

		return await res;
	},

	urlMiddleware ({url}),

	batchMiddleware ({
		batchUrl,
		batchTimeout: 60
	}),

	retryMiddleware ({
		fetchTimeout: 15000,
		retryDelays: (attempt: number) => Math.pow (2, attempt + 4) * 100,
		statusCodes: [500, 503, 504]
	})

]);

