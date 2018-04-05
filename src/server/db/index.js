// @flow

import config from 'config';
import mongoose from 'mongoose';

type MongoOptions = {
	connstr: string;
	options: Object;
};

const opts: MongoOptions = config.mongodb;
const {connstr, options} = opts;

mongoose.Promise = Promise;

export default () =>
	mongoose
		.connect (connstr, options)
		.then (() => mongoose.connection);
