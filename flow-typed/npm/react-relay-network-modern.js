// @flow
import {Network} from 'react-relay';
import {QueryResponseCache} from 'relay-runtime';

import type {UrlMiddlewareOpts} from 'react-relay-network-modern/lib/middlewares/url';
import type {AuthMiddlewareOpts} from 'react-relay-network-modern/lib/middlewares/auth';
import type {BatchMiddlewareOpts} from 'react-relay-network-modern/lib/middlewares/batch';
import type {GqlErrorMiddlewareOpts} from 'react-relay-network-modern/lib/middlewares/error';
import type {LoggerMiddlewareOpts} from 'react-relay-network-modern/lib/middlewares/logger';
import type {PerfMiddlewareOpts} from 'react-relay-network-modern/lib/middlewares/perf';
import type {RetryMiddlewareOpts} from 'react-relay-network-modern/lib/middlewares/retry';

declare module 'react-relay-network-modern' {
  	import type {$Request, $Response} from 'express';


	declare export class RelayRequest {
		static lastGenId: number;
		id: string;
		fetchOpts: FetchOpts;
		operation: ConcreteBatch;
		variables: Variables;
		cacheConfig: CacheConfig;
		uploadables: ?UploadableMap;

		constructor(
			operation: ConcreteBatch,
			variables: Variables,
			cacheConfig: CacheConfig,
			uploadables?: ?UploadableMap
		): this;

		getBody(): string | FormData;
		prepareBody(): string | FormData;
		getID(): string;
		getQueryString(): string;
		getVariables(): Variables;
		isMutation(): boolean;
		isFormData(): boolean;
		clone(): RelayRequest;
	}

	declare type Requests = RelayRequest[];

	declare export class RelayRequestBatch {
		constructor (requests: Requests): this;

		fetchOpts: $Shape<FetchOpts>;
		requests: Requests;
		setFetchOption (name: string, value: mixed):void;
		setFetchOptions(opts: Object):void;
		getBody(): string;
		prepareBody(): string;
		getIds(): string[];
		getID(): string;
		isMutation(): boolean;
		isFormData(): boolean;
		clone(): RelayRequestBatch;
		getVariables(): Variables;
		getQueryString(): string;
	}

	declare export class RelayResponse {
		data: ?PayloadData;
		errors: ?Array<any>;

		ok: any;
		status: number;
		statusText: ?string;
		headers: ?{ [name: string]: string };
		url: ?string;
		text: ?string;
		json: mixed;

		static createFromFetch (res: Object): Promise<RelayResponse>;
		static createFromGraphQL (res: { errors?: any, data?: any }): RelayResponse;

		processJsonData(json: mixed):void;
		clone(): RelayResponse;
		toString(): string;
	}

	declare export type RelayRequestAny = RelayRequest | RelayRequestBatch;
	declare export type MiddlewareNextFn = (req: RelayRequestAny) => Promise<RelayResponse>;
	declare export type Middleware = (next: MiddlewareNextFn) => MiddlewareNextFn;

	declare export type MiddlewareSync = {|
		execute: (
			operation: ConcreteBatch,
			variables: Variables,
			cacheConfig: CacheConfig,
			uploadables: ?UploadableMap
		) => ?ObservableFromValue<QueryPayload>,
	|};

	declare export type FetchOpts = {
		url?: string,
		method: 'POST' | 'GET',
		headers: { [name: string]: string },
		body: string | FormData,
		// Avaliable request modes in fetch options. For details see https://fetch.spec.whatwg.org/#requests
		credentials?: 'same-origin' | 'include' | 'omit',
		mode?: 'cors' | 'websocket' | 'navigate' | 'no-cors' | 'same-origin',
		cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached',
		redirect?: 'follow' | 'error' | 'manual',
		[name: string]: mixed,
	};

	declare export type GraphQLResponseErrors = Array<{
		message: string,
		locations?: Array<{
			column: number,
			line: number,
		}>,
		stack?: Array<string>,
	}>;

	declare export type GraphQLResponse = {
		data?: any,
		errors?: GraphQLResponseErrors,
	};

	declare export type RRNLResponseObject = {
		ok: any,
		status: number,
		statusText: string,
		headers: { [name: string]: string },
		url: string,
		payload: ?GraphQLResponse,
	};

	declare export type RNLExecuteFunction = (
		operation: ConcreteBatch,
		variables: Variables,
		cacheConfig: CacheConfig,
		uploadables?: ?UploadableMap
	) => RelayObservable<QueryPayload>;

	declare export type Variables = { [name: string]: any };
	declare export type ConcreteBatch = {
		kind: 'Batch',
		fragment: any,
		id: ?string,
		metadata: { [key: string]: mixed },
		name: string,
		query: any,
		text: ?string,
	};
	declare export type CacheConfig = {
		force?: ?boolean,
		poll?: ?number,
		rerunParamExperimental?: ?any,
	};
	declare export type Disposable = { dispose(): void };
	declare export type Uploadable = File | Blob;
	declare export type UploadableMap = { [key: string]: Uploadable };
	declare export type PayloadData = { [key: string]: mixed };
	declare export type QueryPayload =
	| {|
		data?: ?PayloadData,
		errors?: Array <any>,
		rerunVariables?: Variables
		|}
	| RelayResponse;
	// this is workaround should be class from relay-runtime/network/RelayObservable.js
	declare export type RelayObservable<T> = Promise<T>;
	// Note: This should accept Subscribable<T> instead of RelayObservable<T>,
	// however Flow cannot yet distinguish it from T.
	declare export type ObservableFromValue<T> = RelayObservable<T> | Promise<T> | T;
	declare export type FetchFunction = (
		operation: ConcreteBatch,
		variables: Variables,
		cacheConfig: CacheConfig,
		uploadables: ?UploadableMap
	) => ObservableFromValue<QueryPayload>;
	declare export type FetchHookFunction = (
		operation: ConcreteBatch,
		variables: Variables,
		cacheConfig: CacheConfig,
		uploadables: ?UploadableMap
	) => void | ObservableFromValue<QueryPayload>;
	// See SubscribeFunction type declaration in relay-runtime/network/RelayNetworkTypes.js
	declare export type SubscribeFunction = (
		operation: ConcreteBatch,
		variables: Variables,
		cacheConfig: CacheConfig,
		observer: any
	) => RelayObservable<QueryPayload> | Disposable;


	declare type ExpressMiddleware = (request: $Request, response: $Response) => Promise<void>;


	declare type RelayNetworkLayerOpts = {|
		subscribeFn?: SubscribeFunction,
		beforeFetch?: FetchHookFunction,
	|};

	declare export class RelayNetworkLayer extends Network {
		execute: RNLExecuteFunction;
		+fetchFn: FetchFunction;
		+subscribeFn: ?SubscribeFunction;

		constructor (
			middlewares: Array<?Middleware | MiddlewareSync>,
			opts?: RelayNetworkLayerOpts
		): this;
	}


	declare type CacheMiddlewareOpts = {|
		size?: number,
		ttl?: number,
		onInit?: (cache: QueryResponseCache) => any,
		allowMutations?: boolean,
		allowFormData?: boolean,
		clearOnMutation?: boolean,
	|};

	declare export class RelayNetworkLayerRequest extends RelayRequest{}
	declare export class RelayNetworkLayerRequestBatch extends RelayRequestBatch{}
	declare export class RelayNetworkLayerRequestBatch extends RelayRequestBatch{}
	declare export class RelayNetworkLayerResponse extends RelayResponse{}

	declare export function cacheMiddleware (opts?: CacheMiddlewareOpts): Middleware;
	declare export function urlMiddleware (opts?: UrlMiddlewareOpts): Middleware;
	declare export function batchMiddleware (opts?: BatchMiddlewareOpts): Middleware;
	declare export function authMiddleware (opts?: AuthMiddlewareOpts): Middleware;
	declare export function perfMiddleware (opts?: PerfMiddlewareOpts): Middleware;
	declare export function loggerMiddleware (opts?: LoggerMiddlewareOpts): Middleware;
	declare export function errorMiddleware (opts?: GqlErrorMiddlewareOpts): Middleware;
	declare export function retryMiddleware (opts?: RetryMiddlewareOpts): Middleware;

	declare export function graphqlBatchHTTPWrapper (ExpressMiddleware): ExpressMiddleware;


}