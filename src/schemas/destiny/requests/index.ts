import {BungieMembershipType} from '../../';

export interface DestinyItemTransferRequest {
	itemReferenceHash: number;
	stackSize: number;
	transferToVault: boolean;
	itemId: string;
	characterId: string;
	membershipType: BungieMembershipType;
}
