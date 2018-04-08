// @flow

import {RelayObservable} from 'relay-runtime/lib/RelayObservable';

// import type {
// 	Record,
// 	RecordMap
// } from 'react-relay';

import type {
	FragmentReference as iFragmentReference,
	ConcreteRequest as iConcreteRequest,
	OptimisticUpdate as iOptimisticUpdate
} from 'relay-runtime/lib/RelayRuntime';

import type {
	ExecutePayload as iExecutePayload
} from 'relay-runtime/lib/RelayNetworkTypes';

import type {
	HandlerProvider as iHandlerProvider
} from 'relay-runtime/lib/RelayDefaultHandlerProvider';


declare module 'relay-runtime' {
	import type {
		Record,
		RecordMap,
		DataID,
		RecordState,
		Store as iStore,
		RecordSource as iRecordSource,
		Network,
		OperationSelector,
		SelectorStoreUpdater,
		Disposable,
		Selector,
		PayloadData,
		StoreUpdater,
		Snapshot,
		PayloadError,
		CacheConfig,
		UploadableMap,
		UnstableEnvironmentCore,
		ConcreteFragment as iConcreteFragment,
		ConcreteBatch as iConcreteBatch
	} from 'react-relay';



	declare export type EnvironmentConfig = {
		configName?: string,
		handlerProvider?: iHandlerProvider,
		network: Network,
		store: Store,
	};

	declare export class Environment {
		configName: ?string;
		unstable_internal: UnstableEnvironmentCore;
		constructor(config: EnvironmentConfig): this;

		getStore (): iStore;
		getNetwork (): Network;

		applyUpdate (
			optimisticUpdate: iOptimisticUpdate
		): Disposable;

		revertUpdate(
			update: iOptimisticUpdate
		): void;

		replaceUpdate (
			update: iOptimisticUpdate,
			newUpdate: iOptimisticUpdate
		): void;

		applyMutation ({
			operation: OperationSelector,
			optimisticUpdater?: ?SelectorStoreUpdater,
			optimisticResponse?: Object
		}): Disposable;

		check(readSelector: Selector): boolean;

		commitPayload(
			operationSelector: OperationSelector,
			payload: PayloadData,
		): void;

		commitUpdate(updater: StoreUpdater): void;

		lookup(readSelector: Selector): Snapshot;

		subscribe(
			snapshot: Snapshot,
			callback: (snapshot: Snapshot) => void,
		): Disposable;

		retain(selector: Selector): Disposable;

		isSelectorLoading(selector: Selector): boolean;

		execute({
			operation: OperationSelector,
			cacheConfig?: ?CacheConfig,
			updater?: ?SelectorStoreUpdater
		}): RelayObservable<iExecutePayload>;

		executeMutation({|
			operation: OperationSelector,
			optimisticUpdater?: ?SelectorStoreUpdater,
			optimisticResponse?: ?Object,
			updater?: ?SelectorStoreUpdater,
			uploadables?: ?UploadableMap,
		|}): RelayObservable<iExecutePayload>;

		sendQuery({
			cacheConfig?: ?CacheConfig,
			onCompleted?: ?() => void,
			onError?: ?(error: Error) => void,
			onNext?: ?(payload: iExecutePayload) => void,
			operation: OperationSelector,
		}): Disposable;

		streamQuery({
			cacheConfig?: ?CacheConfig,
			onCompleted?: ?() => void,
			onError?: ?(error: Error) => void,
			onNext?: ?(payload: iExecutePayload) => void,
			operation: OperationSelector,
		}): Disposable;

		sendMutation({
			onCompleted?: ?(errors: ?Array<PayloadError>) => void,
			onError?: ?(error: Error) => void,
			operation: OperationSelector,
			optimisticUpdater?: ?SelectorStoreUpdater,
			optimisticResponse?: Object,
			updater?: ?SelectorStoreUpdater,
			uploadables?: UploadableMap,
		}): Disposable;

		sendSubscription({
			onCompleted?: ?(errors: ?Array<PayloadError>) => void,
			onNext?: ?(payload: iExecutePayload) => void,
			onError?: ?(error: Error) => void,
			operation: OperationSelector,
			updater?: ?SelectorStoreUpdater,
		}): Disposable;
	}

	declare export class RecordSource {
		constructor(records?: RecordMap<*>): this;

		clear(): void;
		delete(dataID: DataID): void;
		get(dataID: DataID): ?Record;
		getRecordIDs(): Array<DataID>;
		getStatus(dataID: DataID): RecordState;
		has(dataID: DataID): boolean;
		load(
			dataID: DataID,
			callback: (error: ?Error, record: ?Record) => void,
		): void;
		remove(dataID: DataID): void;
		set(dataID: DataID, record: Record): void;
		size(): number;
		toJSON(): Object;
	}

	declare export class Store {
		constructor(source: iRecordSource): this;

		getSource(): iRecordSource;
		check (selector: Selector): boolean;
		retain (selector: Selector): Disposable;
		lookup (selector: Selector): Snapshot;
		notify(): void;
		publish(source: iRecordSource): void;

		subscribe(
			snapshot: Snapshot,
			callback: (snapshot: Snapshot) => void,
		): Disposable;
	}

	// declare var Network: any;
	// declare var RecordSource: any;
	// declare var Store: any;

	// declare var areEqualSelectors: any;
	// declare var createFragmentSpecResolver: any;
	// declare var createOperationSelector: any;
	// declare var getDataIDsFromObject: any;
	// declare var getFragment: any;
	// declare var getOperation: any;
	// declare var getSelector: any;
	// declare var getSelectorList: any;
	// declare var getSelectorsFromObject: any;
	// declare var getVariablesFromObject: any;
	// declare var graphql: any;

	// declare var ConnectionHandler: any;
	// declare var ViewerHandler: any;

	// declare var commitLocalUpdate: any;
	// declare var commitMutation: any;
	// declare var fetchQuery: any;
	// declare var isRelayStaticEnvironment: any;
	// declare var requestSubscription: any;

	// // Internal types imported in compiler generated files
	declare export type ConcreteFragment = iConcreteFragment;
	declare export type ConcreteBatch = iConcreteBatch;
	declare export type FragmentReference = iFragmentReference;
	declare export type ConcreteRequest = iConcreteRequest;
}