import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

type HTTPHeaders = Record<string, string[] | string | undefined>;

export type Opts = {
	baseUrl?: string;
	headers?: HTTPHeaders | (() => HTTPHeaders | Promise<HTTPHeaders>);
	onRequest?: (req: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
	onResponse?: (res: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
	onError?: (error: AxiosError) => any;
};

// TODO: if all input params are optional make input optional
export type ClientType<T> = T extends Record<string, any>
	? {
			[K in keyof T]: T[K] extends {
				input?: unknown;
				output?: unknown;
				handler?: unknown;
			}
				? T[K]['input'] extends undefined
					? () => Promise<T[K]['output']>
					: (input: T[K]['input']) => Promise<T[K]['output']>
				: ClientType<T[K]>;
	  }
	: never;
