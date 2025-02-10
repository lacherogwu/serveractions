export type CreateActionsClientOptions = {
	headers?: any;
	baseUrl?: string;
};
export function createClient<T extends any>(options: CreateActionsClientOptions) {
	return (() => ({})) as T;
}
