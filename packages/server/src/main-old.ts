import { z, type ZodTypeAny, type ZodObject, type output } from 'zod';

// 1. Correct handler type with contextual parameters
type Handler<I extends ZodObject<any> | undefined, O extends ZodTypeAny | undefined, R> = I extends ZodObject<any> ? (input: output<I>, ctx: any) => Promise<O extends ZodTypeAny ? output<O> : R> : (ctx?: any) => Promise<O extends ZodTypeAny ? output<O> : R>;

// 2. Action definition type
type ActionDefinition<I extends ZodObject<any> | undefined, O extends ZodTypeAny | undefined, R = unknown> = {
	input?: I;
	output?: O;
	handler: Handler<I, O, R>;
};

// 3. Recursive action tree type
type ActionTree = {
	[key: string]: ActionDefinition<any, any> | ActionTree;
};

// 4. Client function type with exact parameters
type ClientFunction<I extends ZodObject<any> | undefined, R> = I extends ZodObject<any> ? (input: output<I>) => Promise<R> : () => Promise<R>;

// 5. Mapped client type
type ClientActions<T> = {
	[K in keyof T]: T[K] extends ActionDefinition<infer I, infer O, infer R> ? ClientFunction<I, O extends ZodTypeAny ? output<O> : R> : T[K] extends ActionTree ? ClientActions<T[K]> : never;
};

// 6. Implementation with strict parameter handling
export function createActions<T extends ActionTree>(actions: T): ClientActions<T> {
	const createClient = (obj: ActionTree): any =>
		Object.fromEntries(
			Object.entries(obj).map(([key, value]) => {
				if (isActionDefinition(value)) {
					return [
						key,
						value.input
							? async (input: unknown) => {
									const parsed = value.input.parse(input);
									const result = await value.handler(parsed, {});
									return value.output?.parse(result) ?? result;
							  }
							: async () => {
									// @ts-ignore
									const result = await value.handler({});
									return value.output?.parse(result) ?? result;
							  },
					];
				}
				return [key, createClient(value)];
			}),
		);

	return createClient(actions) as ClientActions<T>;
}

// 7. Type guard
function isActionDefinition(value: ActionDefinition<any, any> | ActionTree): value is ActionDefinition<any, any> {
	return 'handler' in value;
}

// 8. Define action with precise type inference
export function defineAction<
	const T extends {
		input?: ZodObject<any> | undefined;
		output?: ZodTypeAny | undefined;
		handler: Handler<T['input'] extends ZodObject<any> ? T['input'] : undefined, T['output'] extends ZodTypeAny ? T['output'] : undefined, ReturnType<T['handler']> extends Promise<infer R> ? R : never>;
	},
>(config: T): T {
	return config;
}

// 9. Working implementation
const actions = createActions({
	user: {
		list: defineAction({
			input: z.object({ id: z.number() }),
			handler: async (input: { id: number }) => [1, 2, 3],
		}),
		create: defineAction({
			input: z.object({
				name: z.string(),
				age: z.number().min(0),
				email: z.string().email(),
			}),
			output: z.object({
				id: z.number(),
				created: z.date(),
			}),
			handler: async () => ({
				id: 1,
				created: new Date(),
			}),
		}),
	},
	getItems: defineAction({
		input: z.object({ page: z.number() }),
		output: z.array(z.string()),
		handler: async () => ['1', '2', '3'],
	}),
	simpleAction: defineAction({
		handler: async () => ({ success: true }),
	}),
});

// 10. Verified working calls
// async function example() {
// 	// Valid parameterless call
// 	const simpleResult = await actions.simpleAction();
// 	const success: boolean = simpleResult.success;

// 	// Valid parameterized call
// 	const listResult = await actions.user.list({ id: 123 });

// 	// Valid array access
// 	const items = await actions.getItems({ page: 1 });
// 	const str: string = items[0];

// 	// Expected errors
// 	// @ts-expect-error - Missing required input
// 	await actions.user.list();
// 	// @ts-expect-error - Wrong input type
// 	await actions.user.list({ id: '123' });
// }
