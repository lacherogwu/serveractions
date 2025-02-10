import { defineAction, z } from '@serveractions/server';

export const list = defineAction({
	input: z.object({
		name: z.string(),
	}),
	output: z.array(z.string()),
	handler: async (input, ctx) => {
		// code
		return ['1'];
	},
});
