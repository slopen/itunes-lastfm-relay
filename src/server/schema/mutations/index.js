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
			clientMutationId,
			tag: await Tag.updateTag (tagId, {name})
		};
	},

	tagArtistAdd: async ({input}: TagArtistInput) => {
		const {clientMutationId, tagId, artistId} = input;
		const artist = await Artist.addTag (artistId, tagId);

		await Tag.addArtist (tagId, artistId);

		return {
			clientMutationId,
			tagArtistEdge: {
				cursor: offsetToCursor (0),
				node: artist
			},
			viewerAddArtistId: artistId
		};
	},

	tagArtistRemove: async ({input}: TagArtistInput) => {
		const {clientMutationId, tagId, artistId} = input;
		const artist = await Artist.removeTag (artistId, tagId);

		await Tag.removeArtist (tagId, artistId);

		return {
			clientMutationId,
			tagArtistId: artistId,
			viewerAddArtistEdge: {
				cursor: offsetToCursor (0),
				node: artist
			}
		};
	}
}