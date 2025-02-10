import axios from 'axios';
import type { Opts, ClientType } from './types';
import * as devalue from 'devalue';

type ProxyCallbackOpts = {
	path: string[];
	args: unknown[];
};
type ProxyCallback = (opts: ProxyCallbackOpts) => unknown;

function createInnerProxy(callback: ProxyCallback, path: string[] = []): any {
	return new Proxy(() => {}, {
		get(_target, prop: string): any {
			return createInnerProxy(callback, path.concat(prop));
		},
		async apply(_target, _thisArg, args) {
			return await callback({ path, args });
		},
	});
}

export function createClient<T>(opts?: Opts): ClientType<T> {
	const { baseUrl, headers, onRequest, onResponse, onError } = opts ?? {};

	const getHeaders = async () => {
		if (typeof headers === 'function') {
			return headers();
		}
		return headers;
	};

	const instance = axios.create({
		baseURL: baseUrl,
		headers: {
			'Content-Type': 'application/json',
		},
		transformResponse: (responseAsString: string, _headers, status) => {
			if (status !== 200) return JSON.parse(responseAsString);
			// TODO: apply safe return { data: any, error: any } like Astro
			return devalue.parse(responseAsString);
		},
	});

	instance.interceptors.request.use(onRequest);
	instance.interceptors.response.use(onResponse, async err => {
		if (onError) {
			const error = await onError(err);
			return Promise.reject(error);
		}
		return Promise.reject(err);
	});
	instance.interceptors.response.use(res => res.data);

	return createInnerProxy(async ({ path, args }) => {
		const [input] = args;

		const request: Record<string, any> = {
			method: 'post',
			headers: await getHeaders(),
			url: `/_actions/${path.join('.')}`,
		};

		if (input) {
			request.data = devalue.stringify(input);
		}

		return instance(request);
	});
}
