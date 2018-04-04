const serialize = (data) =>
	JSON.stringify (data).replace (/\//g, '\\/');

export default (markup, data) =>
`<!doctype html>
<html>
	<head>
  		<title>itunes-lastfm-relay</title>
  		<meta charset="utf-8">
  		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
  		<meta name="HandheldFriendly" content="True"/>
  		<meta name="apple-mobile-web-app-status-bar-style" content="white-translucent"/>
  		<meta name="viewport" content="initial-scale=1.0,width=device-width,user-scalable=0,user-scalable=no"/>

  		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

	</head>
	<body>
	  	<div id="root">${markup}</div>
	  	<script>window._preloaded = ${serialize (data)}</script>
	  	<script src="/bundle.js"></script>
	</body>
<html>`;