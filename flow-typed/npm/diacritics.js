declare module 'diacritics' {
	declare export type replacementList = Array <{
		base: string,
		chars: string
	}>;

	declare export function remove (str: string): string;
}