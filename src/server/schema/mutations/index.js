// @flow

import {offsetToCursor} from 'graphql-relay';

import Tag from 'server/schema/types/tag';
import Artist from 'server/schema/types/artist';


type TagUpdateInput = {
	input: {
		clientMutationId: string,
		name: string,
		tagId: string
	}
};

type TagArtistInput = {
	input: {
		clientMutationId: string,
		artistId: string,
		tagId: string
	}
};


export default {

	tagUpdate: async ({input}: TagUpdateInput) => {
		const {clientMutationId, name, tagId} = input;

		return {
			tag: await Tag.updateTag (tagId, {name}),
			clientMutationId
		};
	},

	tagArtistAdd: async ({input}: TagArtistInput) => {
		const {clientMutationId, tagId, artistId} = input;

		const tag = await Tag.addArtist (tagId, artistId);
		const artist = await Artist.addTag (artistId, tagId);

		return {
			clientMutationId,
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

	tagArtistRemove: async ({input}: TagArtistInput) => {
		const {clientMutationId, tagId, artistId} = input;

		const tag = await Tag.removeArtist (tagId, artistId);
		const artist = await Artist.removeTag (artistId, tagId);

		if (tag && artist) {
			return {
				clientMutationId,
				artistTagId: tagId,
				tagArtistId: artistId
			};
		}
	}
}