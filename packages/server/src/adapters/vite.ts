import { esbuildVersion } from 'vite';

export function actionsVite(options: any) {
	console.log({ esbuildVersion });
	return options;
}
