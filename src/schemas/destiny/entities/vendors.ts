import {DestinyItemQuantity, DestinyProgression, DestinyUnlockStatus, VendorItemStatus} from '../';
import {AckState} from '../../user';

/**
 * This component contains essential/summary information about the vendor.
 */
export interface DestinyVendorComponent {
	/**
	 * The unique identifier for the vendor. Use it to look up their DestinyVendorDefinition.
	 */
	vendorHash: number;
	/**
	 * Long ago, we thought it would be a good idea to have special UI that showed whether or not you've seen a Vendor's inventory after cycling.
	 * For now, we don't have that UI anymore. This property still exists for historical purposes. Don't worry about it.
	 */
	ackState: AckState;
	/**
	 * The date when this vendor's inventory will next rotate/refresh.
	 */
	nextRefreshDate: string;
	/**
	 * If True, the Vendor is currently accessible.
	 * If False, they may not actually be visible in the world at the moment.
	 */
	enabled: boolean;
	/**
	 * If True, you can purchase from the Vendor.
	 * Theoretically, Vendors can be restricted from selling items. In practice, none do that (yet?).
	 */
	canPurchase: boolean;
	/**
	 * If the Vendor has a related Reputation, this is the Progression data that represents the character's Reputation level with this Vendor.
	 */
	progression: DestinyProgression;
}

/**
 * A vendor can have many categories of items that they sell. This component will return the category information for available items, as well as the index into those items in the user's sale item list.
 * Note that, since both the category and items are indexes, this data is Content Version dependent. Be sure to check that your content is up to date before using this data. This is an unfortunate, but permanent, limitation of Vendor data.
 */
export interface DestinyVendorCategoriesComponent {
	/**
	 * The list of categories for items that the vendor sells, in rendering order.
	 */
	categories: DestinyVendorCategory[];
}

/**
 * Information about the category and items currently sold in that category.
 */
export interface DestinyVendorCategory {
	/**
	 * An index into the DestinyVendorDefinition.categories property, so you can grab the display data for this category.
	 */
	categoryIndex: number;
	/**
	 * An ordered list of indexes into items being sold in this category (DestinyVendorDefinition.itemList) which will contain more information about the items being sold themselves. Can also be used to index into DestinyVendorSaleItemComponent data, if you asked for that data to be returned.
	 */
	itemIndexes: number[];
}

/**
 * Request this component if you want the details about an item being sold in relation to the character making the request: whether the character can buy it, whether they can afford it, and other data related to purchasing the item.
 * Note that if you want instance, stats, etc... data for the item, you'll have to request additional components such as ItemInstances, ItemPerks etc... and acquire them from the DestinyVendorResponse's "items" property.
 */
export interface DestinyVendorSaleItemComponent {
	/**
	 * The index into the DestinyVendorDefinition.itemList property. Note that this means Vendor data *is* Content Version dependent: make sure you have the latest content before you use Vendor data, or these indexes may mismatch.
	 * Most systems avoid this problem, but Vendors is one area where we are unable to reasonably avoid content dependency at the moment.
	 */
	vendorItemIndex: number;
	/**
	 * The hash of the item being sold, as a quick shortcut for looking up the DestinyInventoryItemDefinition of the sale item.
	 */
	itemHash: number;
	/**
	 * A flag indicating whether the requesting character can buy the item, and if not the reasons why the character can't buy it.
	 */
	saleStatus: VendorItemStatus;
	/**
	 * A summary of the current costs of the item.
	 */
	costs: DestinyItemQuantity[];
	/**
	 * If you can't buy the item due to a complex character state, these will be hashes for DestinyUnlockDefinitions that you can check to see messages regarding the failure (if the unlocks have human readable information: it is not guaranteed that Unlocks will have human readable strings, and your application will have to handle that)
	 * Prefer using failureIndexes instead. These are provided for informational purposes, but have largely been supplanted by failureIndexes.
	 */
	requiredUnlocks: number[];
	/**
	 * If any complex unlock states are checked in determining purchasability, these will be returned here along with the status of the unlock check.
	 * Prefer using failureIndexes instead. These are provided for informational purposes, but have largely been supplanted by failureIndexes.
	 */
	unlockStatuses: DestinyUnlockStatus[];
	/**
	 * Indexes in to the "failureStrings" lookup table in DestinyVendorDefinition for the given Vendor. Gives some more reliable failure information for why you can't purchase an item.
	 * It is preferred to use these over requiredUnlocks and unlockStatuses: the latter are provided mostly in case someone can do something interesting with it that I didn't anticipate.
	 */
	failureIndexes: number[];
}
