import { z, ZodObject, ZodTypeAny } from 'zod';
export * from 'zod';

export type Context = {
	req: any;
	res: any;
};

export type Action<I extends ZodObject<any> | undefined, O extends ZodTypeAny | undefined = undefined, R = any> = {
	input?: I;
	output?: O;
	handler: (input: I extends ZodObject<any> ? z.infer<I> : undefined, ctx: Context) => Promise<O extends ZodTypeAny ? z.infer<O> : R>;
};

export function defineAction<I extends ZodObject<any> | undefined = undefined, O extends ZodTypeAny | undefined = undefined, R = any>(action: Action<I, O, R>): Action<I, O, R> {
	return action;
}
