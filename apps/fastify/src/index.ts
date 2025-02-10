import fastify from 'fastify';
import { actions } from 'dashboard-actions';
import { actionsFastify } from '@serveractions/server/adapters/fastify';

const app = fastify();

app.register(actionsFastify, {
	actions,
});

app.listen({ port: 3000, host: '0.0.0.0' }, () => console.log('Server is running on http://localhost:3000'));
