import fastify from 'fastify';
import { actions } from 'dashboard-actions';
import { actionsFastify } from '@serveractions/server/adapters/fastify';
import * as devalue from 'devalue';
import cors from '@fastify/cors';

const app = fastify();

app.register(actionsFastify, {
	actions,
});

app.register(cors);

app.post('/_actions/:path', async (req, res) => {
	const { path } = req.params;

	const body = devalue.unflatten(req.body);
	console.log(body);

	const output = {
		id: 1,
		name: 'John Doe',
		createdAt: new Date(),
		updateAt: new Date(),
	};

	return devalue.stringify(output);
});

app.listen({ port: 3000, host: '0.0.0.0' }, () => console.log('Server is running on http://localhost:3000'));
