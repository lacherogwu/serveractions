import type { IncomingMessage, ServerResponse } from 'node:http';

export async function handleActionCall(req: IncomingMessage, res: ServerResponse) {
	// code
	console.log('URL:', req.url);

	res
		.writeHead(200, {
			'content-type': 'text/plain',
		})
		.end('OK');
}
