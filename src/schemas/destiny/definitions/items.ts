import {DestinyDisplayPropertiesDefinition} from './common';

/**
 * Defines the tier type of an item. Mostly this provides human readable properties for types like Common, Rare, etc...
 * It also provides some base data for infusion that could be useful.
 */
export interface DestinyItemTierTypeDefinition {
	displayProperties: DestinyDisplayPropertiesDefinition;
	/**
	 * If this tier defines infusion properties, they will be contained here.
	 */
	infusionProcess: DestinyItemTierTypeInfusionBlock;
	/**
	 * The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.
	 * When entities refer to each other in Destiny content, it is this hash that they are referring to.
	 */
	hash: number;
	/**
	 * The index of the entity as it was found in the investment tables.
	 */
	index: number;
	/**
	 * If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry!
	 */
	redacted: boolean;
}

export interface DestinyItemTierTypeInfusionBlock {
	/**
	 * The default portion of quality that will transfer from the infuser to the infusee item. (InfuserQuality - InfuseeQuality) * baseQualityTransferRatio = base quality transferred.
	 */
	baseQualityTransferRatio: number;
	/**
	 * As long as InfuserQuality > InfuseeQuality, the amount of quality bestowed is guaranteed to be at least this value, even if the transferRatio would dictate that it should be less. The total amount of quality that ends up in the Infusee cannot exceed the Infuser's quality however (for instance, if you infuse a 300 item with a 301 item and the minimum quality increment is 10, the infused item will not end up with 310 quality)
	 */
	minimumQualityIncrement: number;
}

/**
 * A shortcut for the fact that some items have a "Preview Vendor" - See DestinyInventoryItemDefinition.preview.previewVendorHash - that is intended to be used to show what items you can get as a result of acquiring or using this item.
 * A common example of this in Destiny 1 was Eververse "Boxes," which could have many possible items. This "Preview Vendor" is not a vendor you can actually see in the game, but it defines categories and sale items for all of the possible items you could get from the Box so that the game can show them to you. We summarize that info here so that you don't have to do that Vendor lookup and aggregation manually.
 */
export interface DestinyDerivedItemCategoryDefinition {
	/**
	 * The localized string for the category title. This will be something describing the items you can get as a group, or your likelihood/the quantity you'll get.
	 */
	categoryDescription: string;
	/**
	 * This is the list of all of the items for this category and the basic properties we'll know about them.
	 */
	items: DestinyDerivedItemDefinition[];
}

/**
 * This is a reference to, and summary data for, a specific item that you can get as a result of Using or Acquiring some other Item (For example, this could be summary information for an Emote that you can get by opening an an Eververse Box) See DestinyDerivedItemCategoryDefinition for more information.
 */
export interface DestinyDerivedItemDefinition {
	/**
	 * The hash for the DestinyInventoryItemDefinition of this derived item, if there is one. Sometimes we are given this information as a manual override, in which case there won't be an actual DestinyInventoryItemDefinition for what we display, but you can still show the strings from this object itself.
	 */
	itemHash?: number;
	/**
	 * The name of the derived item.
	 */
	itemName: string;
	/**
	 * Additional details about the derived item, in addition to the description.
	 */
	itemDetail: string;
	/**
	 * A brief description of the item.
	 */
	itemDescription: string;
	/**
	 * An icon for the item.
	 */
	iconPath: string;
	/**
	 * If the item was derived from a "Preview Vendor", this will be an index into the DestinyVendorDefinition's itemList property. Otherwise, -1.
	 */
	vendorItemIndex: number;
}

/**
 * If an item is a Plug, its DestinyInventoryItemDefinition.plug property will be populated with an instance of one of these bad boys.
 * This gives information about when it can be inserted, what the plug's category is (and thus whether it is compatible with a socket... see DestinySocketTypeDefinition for information about Plug Categories and socket compatibility), whether it is enabled and other Plug info.
 */
export interface DestinyItemPlugDefinition {
	/**
	 * The rules around when this plug can be inserted into a socket, aside from the socket's individual restrictions.
	 * The live data DestinyItemPlugComponent.insertFailIndexes will be an index into this array, so you can pull out the failure strings appropriate for the user.
	 */
	insertionRules: DestinyPlugRuleDefinition[];
	/**
	 * The string identifier for the plug's category. Use the socket's DestinySocketTypeDefinition.plugWhitelist to determine whether this plug can be inserted into the socket.
	 */
	plugCategoryIdentifier: string;
	/**
	 * The hash for the plugCategoryIdentifier. You can use this instead if you wish: I put both in the definition for debugging purposes.
	 */
	plugCategoryHash: number;
	/**
	 * If you successfully socket the item, this will determine whether or not you get "refunded" on the plug.
	 */
	onActionRecreateSelf: boolean;
	/**
	 * If inserting this plug requires materials, this is the hash identifier for looking up the DestinyMaterialRequirementSetDefinition for those requirements.
	 */
	insertionMaterialRequirementHash: number;
	/**
	 * In the game, if you're inspecting a plug item directly, this will be the item shown with the plug attached. Look up the DestinyInventoryItemDefinition for this hash for the item.
	 */
	previewItemOverrideHash: number;
	/**
	 * It's not enough for the plug to be inserted. It has to be enabled as well. For it to be enabled, it may require materials. This is the hash identifier for the DestinyMaterialRequirementSetDefinition for those requirements, if there is one.
	 */
	enabledMaterialRequirementHash: number;
	/**
	 * The rules around whether the plug, once inserted, is enabled and providing its benefits.
	 * The live data DestinyItemPlugComponent.enableFailIndexes will be an index into this array, so you can pull out the failure strings appropriate for the user.
	 */
	enabledRules: DestinyPlugRuleDefinition[];
}

/**
 * Dictates a rule around whether the plug is enabled or insertable.
 * In practice, the live Destiny data will refer to these entries by index. You can then look up that index in the appropriate property (enabledRules or insertionRules) to get the localized string for the failure message if it failed.
 */
export interface DestinyPlugRuleDefinition {
	/**
	 * The localized string to show if this rule fails.
	 */
	failureMessage: string;
}
