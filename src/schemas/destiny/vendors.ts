import {DestinyItemQuantity, DestinyVendorItemRefundPolicy} from './';

/**
 * If a character purchased an item that is refundable, a Vendor Receipt will be created on the user's Destiny Profile. These expire after a configurable period of time, but until then can be used to get refunds on items. BNet does not provide the ability to refund a purchase *yet*, but you know.
 */
export interface DestinyVendorReceipt {
	/**
	 * The amount paid for the item, in terms of items that were consumed in the purchase and their quantity.
	 */
	currencyPaid: DestinyItemQuantity[];
	/**
	 * The item that was received, and its quantity.
	 */
	itemReceived: DestinyItemQuantity;
	/**
	 * The unlock flag used to determine whether you still have the purchased item.
	 */
	licenseUnlockHash: number;
	/**
	 * The ID of the character who made the purchase.
	 */
	purchasedByCharacterId: string;
	/**
	 * Whether you can get a refund, and what happens in order for the refund to be received. See the DestinyVendorItemRefundPolicy enum for details.
	 */
	refundPolicy: DestinyVendorItemRefundPolicy;
	/**
	 * The identifier of this receipt.
	 */
	sequenceNumber: number;
	/**
	 * The seconds since epoch at which this receipt is rendered invalid.
	 */
	timeToExpiration: string;
	/**
	 * The date at which this receipt is rendered invalid.
	 */
	expiresOn: string;
}
