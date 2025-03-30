import type { Plugin } from 'vite';
import { compileActionsFile, writeModuleDTS, resolveActionsPath, isActionsFile } from './utils';
import { RESOLVED_VIRTUAL_MODULE_ID, VIRTUAL_MODULE_ID } from './constants';
import type { ServerActionsOptions } from './types';
import { handleActionCall } from './devServer';
export type * from './types';

export function plugin(options: ServerActionsOptions = {}): Plugin {
	let compiledCode: string = '';
	let root: string;

	return {
		name: 'vite-server-actions',
		configResolved(config) {
			root = config.root;
		},

		async buildStart() {
			// compiledCode = await compileActionsFile(root, options.actionsDir);
			// console.log('🚀 → buildStart → compiledCode:', compiledCode);
			// await writeModuleDTS(root, options.actionsDir);
		},

		configureServer(server) {
			const watchDir = resolveActionsPath(root, options.actionsDir);
			server.watcher.add(watchDir);

			server.watcher.on('change', async path => {
				if (isActionsFile(path, options.actionsDir)) {
					compiledCode = await compileActionsFile(root, options.actionsDir);
				}
			});

			return () => {
				// TODO: here need to invoke action.handler
				// validate input/output
				// build context
				server.middlewares.use((req, res, next) => {
					if (req.url?.startsWith('/_actions/')) {
						return handleActionCall(req, res);
					}
					next();
				});
			};
		},

		resolveId(id) {
			if (id === VIRTUAL_MODULE_ID) {
				return RESOLVED_VIRTUAL_MODULE_ID;
			}
		},

		load(id) {
			if (id === RESOLVED_VIRTUAL_MODULE_ID) {
				// console.log(compiledCode);
				// return compiledCode;
				// TODO: use the deindent (search on medusajs)
				return `
				import { createClient } from '@serveractions/client';
				export const actions = createClient();
				`;
			}
		},

		// handleHotUpdate({ file, server }) {
		// 	if (isActionsFile(file, options.actionsDir)) {
		// 		const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID);
		// 		if (mod) {
		// 			return [mod];
		// 		}
		// 	}
		// },

		generateBundle() {
			// this.emitFile({
			// 	type: 'asset',
			// 	fileName: 'server-actions.d.ts',
			// 	source: TYPE_DECLARATION,
			// });
		},
	};
}

// async function compileActionsFile() {
// 	// TODO: handle .vite folder

// 	const basePath = '/Users/asaf/Desktop/vite-server-actions/playground';
// 	const actionsEntryFilePath = `${basePath}/src/actions/index.ts`;
// 	const code = await fs.readFile(actionsEntryFilePath, 'utf-8');
// 	const result = await transformWithEsbuild(code, 'actions.ts', {
// 		format: 'esm',
// 	});

// 	await fs.writeFile(`${basePath}/.vite/actions.js`, result.code);
// }
