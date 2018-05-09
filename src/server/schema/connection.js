import {
	cursorToOffset,
	connectionFromArraySlice
} from 'graphql-relay';


export default (T) => async (query, variables) => {
	const {first: limit = 1, after} = variables;
	const offset = after ? cursorToOffset (after) : 0;

	const count = await T
		.MongooseModel
		.count (query);

	const data = await T
		.MongooseModel
		.find (query)
		.skip (offset)
		.limit (limit);

	return connectionFromArraySlice (
		data.map ((doc) => new T (doc)),
		variables,
		{
			sliceStart: offset,
			arrayLength: count
		}
	);
}
