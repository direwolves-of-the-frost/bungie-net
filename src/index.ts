import {Client} from './client';
import {Destiny2Module} from './modules/destiny2.module';

export class BungieAPI {
	private client: Client;
	public readonly destiny2: Destiny2Module;

	constructor(apiKey: string) {
		this.client = new Client(apiKey, 'https://www.bungie.net/Platform/');
		this.destiny2 = new Destiny2Module(this.client);
	}
}
