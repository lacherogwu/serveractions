/// <reference types="vite/client" />

declare module 'vite:actions' {
	type Actions = import('/Users/asaf/Desktop/server-actions/apps/dashboard/src/actions');
	const actions: Actions;
}
