var getSchema = require ('@risingstack/graffiti-mongoose').getSchema;

const Tag = require ('../models/Tag');
const Artist = require ('../models/Artist');

const options = {
	mutation: false,
	allowMongoIDMutation: false
};


module.exports = getSchema ([Artist, Tag], options);
