import { createClient } from '@serveractions/client';

type Actions = typeof import('dashboard-actions')['actions'];

export const actions = createClient<Actions>({
	baseUrl: 'https://api.example.com',
	headers: async () => {
		const token = 'abc';

		return {
			Authorization: `Bearer ${token}`,
		};
	},
});
