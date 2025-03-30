declare module 'vite:actions' {
	type Actions = typeof import('/Users/asaf/Desktop/server-actions/apps/vite-dashboard/src/actions/index.ts')['actions'];
	// const actions: import('@serveractions/server/adapters/vite/client').ClientType<Actions>;
	const actions: import('@serveractions/client').ClientType<Actions>;
}
