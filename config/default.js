module.exports = {

	name: 'itunes-lastfm-relay',
	port: 8080,

	devPort: 8090,

	contentBase: '../',

	mongodb: {
		connstr: 'mongodb://localhost:27017/lfm',

		options: {
			useMongoClient: true,
			autoReconnect: true,
			reconnectInterval: 1000
		}
	}
};