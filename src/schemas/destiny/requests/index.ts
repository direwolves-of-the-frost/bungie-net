import {BungieMembershipType} from '../../';

import * as Actions from './actions';
export {Actions};

export interface DestinyItemTransferRequest {
	itemReferenceHash: number;
	stackSize: number;
	transferToVault: boolean;
	itemId: string;
	characterId: string;
	membershipType: BungieMembershipType;
}
