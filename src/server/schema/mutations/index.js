import {offsetToCursor} from 'graphql-relay';

import Node from 'server/schema/types/node';


export default {

	tagUpdate: async ({input}) => {
		const {clientMutationId, name, id} = input;
		const tag = await Node.fromGlobalId (id);

		tag.name = name;

		return {
			tag,
			clientMutationId
		};
	},

	tagArtistAdd: async ({input}) => {
		const {clientMutationId, tagId, artistId} = input;
		const tag = await Node.fromGlobalId (tagId);
		const artist = await Node.fromGlobalId (artistId);

		return {
			clientMutationId,
			tag,
			artist,
			artistTagEdge: {
				cursor: offsetToCursor (0),
				node: tag
			},
			tagArtistEdge: {
				cursor: offsetToCursor (0),
				node: artist
			}
		};
	},

	tagArtistRemove: async ({input}) => {
		const {clientMutationId, tagId, artistId} = input;
		const tag = await Node.fromGlobalId (tagId);
		const artist = await Node.fromGlobalId (artistId);

		return {
			clientMutationId,
			artistTagId: tag.id,
			tagArtistId: artist.id
		};
	}
}