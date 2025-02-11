import { createClient } from '@serveractions/client';
import type { Actions } from '../../../fastify/src/actions';

export const client = createClient<Actions>({
	baseUrl: 'http://localhost:3000',
});
