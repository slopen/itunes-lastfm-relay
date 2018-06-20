const env = require ('process-env');
const name = 'itunes-lastfm-relay';

env.set ('NODE_TLS_REJECT_UNAUTHORIZED', '0');

module.exports = {

	name,
	port: 8080,

	devPort: 8090,

	contentBase: '../',

	mongodb: {
		connstr: 'mongodb://localhost:27017/' + name,

		options: {
			autoReconnect: true,
			reconnectInterval: 1000
		}
	},

	ssr: true

};