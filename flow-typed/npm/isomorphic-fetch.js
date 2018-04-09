declare module 'isomorphic-fetch' {
	declare type _fetch = typeof fetch;
	declare export default _fetch;
}