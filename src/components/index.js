// @flow

import 'regenerator-runtime/runtime';

import React from 'react';
import {hydrate} from 'react-dom';

import 'styles/styles.less';
import App from 'components/routes';


const el = document.getElementById ('root');

if (el) {
	hydrate (<App/>, el);
} else {
	console.error ('no root node found');
}
