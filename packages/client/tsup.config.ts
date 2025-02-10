import { defineConfig } from 'tsup';

export default defineConfig(() => ({
	name: '@serveractions/client',
	entry: ['src/main.ts'],
	format: ['esm'],
	bundle: true,
	clean: true,
	dts: true,
}));
