import { z } from 'zod';
import { defineAction } from '@serveractions/server';

export const list = defineAction({
	input: z.object({
		id: z.string(),
	}),
	output: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
		}),
	),
	handler: async () => {},
});

export const doSomething = defineAction({
	handler: async () => {
		console.log('handler');
	},
});
