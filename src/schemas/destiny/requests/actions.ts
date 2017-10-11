import {BungieMembershipType} from '../../';

export interface DestinyActionRequest {
	membershipType: BungieMembershipType;
}

export interface DestinyCharacterActionRequest {
	characterId: string;
	membershipType: BungieMembershipType;
}

export interface DestinyItemActionRequest {
	itemId: string;
	characterId: string;
	membershipType: BungieMembershipType;
}

export interface DestinyItemSetActionRequest {
	itemIds: string[];
	characterId: string;
	membershipType: BungieMembershipType;
}

export interface DestinyItemStateRequest {
	state: boolean;
	itemId: string;
	characterId: string;
	membershipType: BungieMembershipType;
}
