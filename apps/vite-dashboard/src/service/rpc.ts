import { createClient } from '@serveractions/client';
import type { Actions } from '../../../fastify/src/actions';

export const client = createClient<Actions>({
	baseUrl: 'http://localhost:3000',
});
// const x = await client.user.create({ name: 'abc' });
// const y = await client.user.findFirst();
// const z = await client.user.findFirst2({ id: undefined });
