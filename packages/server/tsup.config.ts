import { defineConfig } from 'tsup';

export default defineConfig(() => ({
	name: '@serveractions/server',
	entry: ['src/main.ts', 'src/adapters/*.ts'],
	format: ['esm'],
	bundle: true,
	clean: true,
	dts: true,
}));
