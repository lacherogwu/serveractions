import { defineAction, z } from '@serveractions/server';

export const list = defineAction({
	input: z.object({
		page: z.number().optional(),
		limit: z.number().optional(),
	}),
	handler: async input => {
		const { limit, page } = input;
		console.log({ limit, page });

		return [
			{ id: 1, name: 'John Doe' },
			{ id: 2, name: 'John Doe' },
			{ id: 3, name: 'John Doe' },
		];
	},
});

export const create = defineAction({
	input: z.object({
		name: z.string(),
		createdAt: z.date(),
	}),
	output: z.object({
		id: z.number(),
		name: z.string(),
	}),
	handler: async input => {
		const { name } = input;
		console.log({ name });

		return { id: 1, name, password: '123456' };
	},
});

export const findFirst = defineAction({
	// output: z.object({
	// 	id: z.number(),
	// 	name: z.string(),
	// }),
	handler: async input => {
		return { id: 1, name: 'abc', password: '123456' };
	},
});

export const findFirst2 = defineAction({
	input: z.object({
		id: z.number().optional(),
	}),
	handler: async input => {
		return { id: 1, name: 'abc', password: '123456' };
	},
});

export const update = defineAction({
	input: z.object({
		id: z.number().optional(),
	}),
	handler: async input => {
		console.log(input.id);
	},
});
