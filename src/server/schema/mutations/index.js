
export default {

	updateTag: function ({input}) {
		const {clientMutationId, name, id} = input;

		console.log ('* update tag', {clientMutationId, name, id});

		return Promise.resolve ({
			clientMutationId,
			tag: {name, id}
		});
	},

	updateArtist: function ({input}) {
		const {clientMutationId, name, description, id} = input;

		console.log ('* update artist', {clientMutationId, name, description, id});

		return Promise.resolve ({
			clientMutationId,
			artist: {name, description, id}
		});
	}
}