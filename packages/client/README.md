# Client

responsive to take server defined actions

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
	users: {
		list: {
			handler: (input, ctx) => {
				return [{ id: '123', name: 'John' }];
			},
		},
	},
};
```

and transform in into a client proxy that receives this object and creates a proxy that calls server actions
basically it should just create a proxy, but it should create the correct types out of that object

```ts
const actions = {
	createUser: (input: { name: string }) => {
		return fetch('/_actions/createUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(input),
		});
	},
	users: {
		list: () => {
			return fetch('/_actions/users.list', {
				method: 'POST',
			});
		},
	},
};
```

```ts
function createClient<T>() {
	return new Proxy(() => ({}), {
		get(target, prop) {
			return () => {
				return fetch(`/_actions/${prop}`, {
					method: 'POST',
				});
			};
		},
	});
}
```
