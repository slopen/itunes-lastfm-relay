// @flow

import {remove} from 'diacritics';


export default (name: string) => {
	var s = remove (name)
		.replace (/^ +/g, '')
		.replace (/&/g, ' ')
		.replace (/\*/g, ' ')
		.replace (/[^\S]+/g, ' ')
		.replace (/ +$/g, '.')
		.replace (/\/+/g, '.')
		.replace (/`/g, '')
		.replace (/[+\-|.%]+/g, '.')
		.replace (/[^\x00-\x7F]+/g, ' ')
		.replace (/ +/g, ' ')
		.replace (/[()]/g, '.')
		.replace (/\./g, '.*');

	return new RegExp (s, 'i');
}
