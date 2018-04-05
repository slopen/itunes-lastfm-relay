const name = 'itunes-lastfm-relay';

module.exports = {

	name,
	port: 8080,

	devPort: 8090,

	contentBase: '../',

	mongodb: {
		connstr: 'mongodb://localhost:27017/' + name,

		options: {
			useMongoClient: true,
			autoReconnect: true,
			reconnectInterval: 1000
		}
	},

	graffiti: {
		mutation: false,
		allowMongoIDMutation: false
	},

	ssr: true

};