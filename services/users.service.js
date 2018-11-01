'use strict';
const USER_NUMBER = 2;
module.exports = {
	name: 'users',

	settings: {},
	dependencies: [],


	actions: {
		list () {
			const userIds = [...new Array(USER_NUMBER).keys()];
			return userIds.map((id) => ({id, name: `user ${id}`}));
		},
		async posts (ctx) {
			const userIds = [...new Array(USER_NUMBER).keys()];
			this.logger.info('posts started');
			const postsPromises = userIds.map(async (id) => {
				this.logger.info(`single post get call ${id}`);
				const userPosts = await ctx.call('posts.userPosts', {userId: id});
				this.logger.info(`single post return ${id} with posts ${JSON.stringify(userPosts)}`);
				return ({id, name: `post ${id}`, posts: userPosts});
			});
			const users = await Promise.all(postsPromises);
			this.logger.info('posts returns');
			return users;
		}
	},


	events: {},


	methods: {
		allPosts (ctx) {

		}
	},

	async created () {

	},


	async started () {

	},

	async stopped () {

	}
};
