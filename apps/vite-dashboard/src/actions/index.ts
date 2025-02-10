import { defineAction, z } from '@serveractions/server';
import * as user from './user';

export const actions = {
	cool: defineAction({
		// input: z.object({
		// 	name: z.string(),
		// }),
		handler: async (input, ctx) => {
			// server code here...
		},
	}),
	user,
};
