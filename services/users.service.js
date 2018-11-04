'use strict';
const USER_NUMBER = 10;
const MAX_EXECUTION_COUNT = process.env.MAX_EXECUTION_COUNT || 2;
const DIE_AFTER_CALLS = MAX_EXECUTION_COUNT;// Math.floor(Math.random() * MAX_EXECUTION_COUNT) + 1;
let overallCalls = 0;
module.exports = {
	name: 'users',

	settings: {},
	dependencies: [],


	actions: {
		async list (ctx) {
			await this.checkIfShouldKill(ctx);
			const userIds = [...new Array(USER_NUMBER).keys()];
			return userIds.map((id) => ({id, name: `user ${id}`}));
		},
		async posts (ctx) {
			await this.checkIfShouldKill(ctx);
			const userIds = [...new Array(USER_NUMBER).keys()];
			const postsPromises = userIds.map(async (id) => {
				const userPosts = await ctx.call('posts.userPosts', {userId: id});
				return ({id, name: `post ${id}`, posts: userPosts});
			});
			return await Promise.all(postsPromises);
		}
	},


	events: {},


	methods: {
		async checkIfShouldKill (ctx) {
			overallCalls++;
			if (DIE_AFTER_CALLS > 0 && overallCalls >= DIE_AFTER_CALLS) {
				this.logger.error(`killing service ${this.fullName} worker ${process.pid} after ${overallCalls} calls`);
				// await ctx.broker.destroyService(this);
				// await ctx.broker.stop();
				process.exit(-1);
			}
		}
	},

	async created () {

	},


	async started () {

	},

	async stopped () {

	}
};
