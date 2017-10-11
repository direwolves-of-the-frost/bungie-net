import {DestinyGameVersions} from '../';
import {UserInfoCard} from '../../user';
import {DestinyVendorReceipt} from '../vendors';

/**
 * For now, this isn't used for much: it's a record of the recent refundable purchases that the user has made. In the future, it could be used for providing refunds/buyback via the API. Wouldn't that be fun?
 */
export interface DestinyVendorReceiptsComponent {
	/**
	 * The receipts for refundable purchases made at a vendor.
	 */
	receipts: DestinyVendorReceipt[];
}

/**
 * The most essential summary information about a Profile (in Destiny 1, we called these "Accounts").
 */
export interface DestinyProfileComponent {
	/**
	 * If you need to render the Profile (their platform name, icon, etc...) somewhere, this property contains that information.
	 */
	userInfo: UserInfoCard;
	/**
	 * The last time the user played with any character on this Profile.
	 */
	dateLastPlayed: string;
	/**
	 * If you want to know what expansions they own, this will contain that data.
	 */
	versionsOwned: DestinyGameVersions;
	/**
	 * A list of the character IDs, for further querying on your part.
	 */
	characterIds: string[];
}
