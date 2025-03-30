import { defineAction } from '@serveractions/server';
import * as user from './user';

export const actions = {
	user,
	createMshu: defineAction({
		handler: async () => {},
	}),
};
