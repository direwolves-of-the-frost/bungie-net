import {Headers} from 'request';
import {FullResponse, Options} from 'request-promise-native';
import * as request from 'request-promise-native';

export class Client {
	private apiKey: string;
	private baseUrl: string;
	private accessToken: string;

	constructor(apiKey: string, baseUrl: string) {
		if (!apiKey.match(/^[a-z0-9]{32}$/)) {
			throw new Error(`Invalid API Key: ${apiKey}`);
		}

		if (!baseUrl.match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/)) {
			throw new Error(`Invalid URL: ${baseUrl}`);
		}

		if (baseUrl.endsWith('/')) {
			baseUrl = baseUrl.replace(/\/$/, '');
		}

		this.apiKey = apiKey;
		this.baseUrl = baseUrl;
	}

	public withAccessToken(accessToken: string): Client {
		this.accessToken = accessToken;
		return this;
	}

	public withoutAccessToken(): Client {
		this.accessToken = null;
		return this;
	}

	protected request(method: 'POST' | 'GET' | 'JSON', endpoint: string, params: Object = {}, headers: Headers = {}): Promise<any> {
		if (!endpoint.match(/^([-a-zA-Z0-9@:%_\+.~#?&//=]+){1,}$/)) {
			throw new Error(`Invalid Endpoint: ${endpoint}`);
		}

		if (endpoint.startsWith('/') || endpoint.endsWith('/')) {
			endpoint = endpoint.replace(/^\/|\/$/g, '');
		}

		const options: Options = {
			method,
			json: true,
			resolveWithFullResponse: true,
			uri: `${this.baseUrl}/${endpoint}/`,
			headers: Object.assign(headers, {
				['X-API-Key']: this.apiKey,
			}),
		};

		if (this.accessToken !== undefined) {
			options.auth = {
				bearer: this.accessToken,
			};
		}

		if (method === 'JSON') {
			options.method = 'POST';
			options.body = params;
		} else if (method === 'POST') {
			options.formData = params;
		} else if (method === 'GET') {
			options.qs = params;
		}

		return request(options).then((response: FullResponse) => {
			if (response.statusCode !== 200) {
				throw new Error(`Status Code: ${response.statusCode}`);
			}

			if (response.body instanceof Object) {
				if (response.body.ErrorCode !== 1 || response.body.ErrorStatus !== 'Success') {
					throw new Error(`API Error: ${response.body.ErrorStatus} (${response.body.ErrorCode})`);
				}

				return response.body.Response || null;
			}

			return null;
		});
	}

	public get(endpoint: string, params?: Object, headers?: Headers): Promise<any> {
		return this.request('GET', endpoint, params, headers);
	}

	public post(endpoint: string, params?: Object, headers?: Headers): Promise<any> {
		return this.request('POST', endpoint, params, headers);
	}

	public json(endpoint: string, params?: Object, headers?: Headers): Promise<any> {
		return this.request('JSON', endpoint, params, headers);
	}
}
