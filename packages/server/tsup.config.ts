import { defineConfig } from 'tsup';

export default defineConfig(() => ({
	name: 'vite-actions',
	entry: ['src/main.ts', 'src/adapters/*.ts'],
	format: ['esm'],
	bundle: true,
	clean: true,
	dts: true,
}));
