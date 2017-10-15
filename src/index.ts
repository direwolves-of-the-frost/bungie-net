import {Client} from './client';

import {CommunityContent} from './modules/community-content';
import {Destiny2} from './modules/destiny2';
import {Forum} from './modules/forum';
import {GroupV2} from './modules/group-v2';
import {Trending} from './modules/trending';
import {User} from './modules/user';

import * as Schemas from './schemas';
export {Schemas};

import * as Responses from './responses';
export {Responses};

export class BungieAPI {
	private client: Client;
	public readonly communityContent: CommunityContent;
	public readonly destiny2: Destiny2;
	public readonly forum: Forum;
	public readonly groupv2: GroupV2;
	public readonly trending: Trending;
	public readonly user: User;

	constructor(apiKey: string) {
		this.client = new Client(apiKey, 'https://www.bungie.net/Platform/');
		this.communityContent = new CommunityContent(this.client);
		this.destiny2 = new Destiny2(this.client);
		this.forum = new Forum(this.client);
		this.groupv2 = new GroupV2(this.client);
		this.trending = new Trending(this.client);
		this.user = new User(this.client);
	}
}
