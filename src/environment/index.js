// @flow
import {
	Store,
	RecordSource,
	Environment
} from 'relay-runtime';

import network from './network';
import type {RecordSource as RecordSourceType} from 'relay-runtime';

export {cacheReady} from './cache';


const preloaded: ?RecordSourceType = typeof window !== 'undefined'
	? window._preloaded : null;
const recordSource = preloaded
	? new RecordSource (preloaded)
	: new RecordSource ();

const store = new Store (recordSource);
const environment = new Environment ({network, store});

export default environment;
