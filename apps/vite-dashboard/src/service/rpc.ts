import { createClient } from '@serveractions/client';

type Actions = typeof import('dashboard-actions')['actions'];

export const client = createClient<Actions>({
	baseUrl: 'http://localhost:3000',
});
