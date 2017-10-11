import {Client} from './client';

export abstract class Module {
	protected client: Client;

	constructor(client: Client) {
		this.client = client;
	}
}
