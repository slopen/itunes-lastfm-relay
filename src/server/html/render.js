// @flow

import config from 'config';
import type {RecordSource} from 'react-relay';

const {PRODUCTION}: {PRODUCTION: boolean} = config;

const serialize = (data: RecordSource) =>
	JSON.stringify (data).replace (/\//g, '\\/');

export default (markup: ?string, data: ?RecordSource) =>
`<!doctype html>
<html>
	<head>
		<title>itunes-lastfm-relay</title>
		<meta charset="utf-8">
		<meta name="HandheldFriendly" content="True"/>
		<meta name="apple-mobile-web-app-status-bar-style" content="white-translucent"/>
		<meta name="viewport" content="initial-scale=1.0,width=device-width,user-scalable=0,user-scalable=no"/>

		${PRODUCTION ? '<link rel="stylesheet" href="/styles.css">' : ''}
		${data ? '<script>window._preloaded = ' + serialize (data) + '</script>' : ''}
	</head>
	<body>
		<div id="root">${markup || ''}</div>
		<script src="/bundle.js"></script>
	</body>
<html>`;
