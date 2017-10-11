/**
 * A Kiosk is a Vendor (DestinyVendorDefinition) that sells items based on whether you have already acquired that item before.
 * This component returns information about what Kiosk items are available to you on a *Profile* level. It is theoretically possible for Kiosks to have items gated by specific Character as well. If you ever have those, you will find them on the individual character's DestinyCharacterKiosksComponent.
 * Note that, because this component returns vendorItemIndexes (that is to say, indexes into the Kiosk Vendor's itemList property), these results are necessarily content version dependent. Make sure that you have the latest version of the content manifest databases before using this data.
 */
export interface DestinyKiosksComponent {
	/**
	 * A dictionary keyed by the Kiosk Vendor's hash identifier (use it to look up the DestinyVendorDefinition for the relevant kiosk vendor), and whose value is a list of all the items that the user can "see" in the Kiosk, and any other interesting metadata.
	 */
	kioskItems: {[field: number]: DestinyKioskItem[]};
}

export interface DestinyKioskItem {
	/**
	 * The index of the item in the related DestinyVendorDefintion's itemList property, representing the sale.
	 */
	index: number;
	/**
	 * If true, the user can not only see the item, but they can acquire it. It is possible that a user can see a kiosk item and not be able to acquire it.
	 */
	canAcquire: boolean;
	/**
	 * Indexes into failureStrings for the Vendor, indicating the reasons why it failed if any.
	 */
	failureIndexes: number[];
}
