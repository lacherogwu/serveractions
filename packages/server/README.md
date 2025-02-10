# Server

responsive to export `defineAction()` function that creates object in the following shape

```ts
const actions = {
	createUser: {
		input: z.object({
			name: z.string(),
		}),
		output: z.object({
			id: z.string(),
		}),
		handler: (input, ctx) => {
			return { id: '123' };
		},
	},
};
```

```ts
type Action = {
	input: z.ZodObject<any, any>;
	output: z.ZodAnyType;
	handler: (input: any, ctx: any) => any;
};

export function defineAction(action: Action): Action {
	return {
		input: action.input,
		output: action.output,
		handler: action.handler,
	};
}
```
