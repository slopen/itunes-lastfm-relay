declare module 'history' {
	import type {RouterHistory} from 'react-router-dom';

	declare type Props = {
		forceRefresh?: boolean,
		getUserConfirmation (
			message: string,
			callback: Function
		): void,
		keyLength: number
	};

	declare export function createBrowserHistory (prop?: Props): RouterHistory;

}