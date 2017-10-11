import {DestinySocketVisibility} from '../';
import {DestinyDisplayPropertiesDefinition} from './common';

/**
 * All Sockets have a "Type": a set of common properties that determine when the socket allows Plugs to be inserted, what Categories of Plugs can be inserted, and whether the socket is even visible at all given the current game/character/account state.
 * See DestinyInventoryItemDefinition for more information about Socketed items and Plugs.
 */
export interface DestinySocketTypeDefinition {
	/**
	 * There are fields for this display data, but they appear to be unpopulated as of now. I am not sure where in the UI these would show if they even were populated, but I will continue to return this data in case it becomes useful.
	 */
	displayProperties: DestinyDisplayPropertiesDefinition;
	/**
	 * Defines what happens when a plug is inserted into sockets of this type.
	 */
	insertAction: DestinyInsertPlugActionDefinition;
	/**
	 * A list of Plug "Categories" that are allowed to be plugged into sockets of this type.
	 * These should be compared against a given plug item's DestinyInventoryItemDefinition.plug.plugCategoryHash, which indicates the plug item's category.
	 * If the plug's category matches any whitelisted plug, or if the whitelist is empty, it is allowed to be inserted.
	 */
	plugWhitelist: DestinyPlugWhitelistEntryDefinition[];
	socketCategoryHash: number;
	visibility: DestinySocketVisibility;
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

/**
 * Data related to what happens while a plug is being inserted, mostly for UI purposes.
 */
export interface DestinyInsertPlugActionDefinition {
	/**
	 * How long it takes for the Plugging of the item to be completed once it is initiated, if you care.
	 */
	actionExecuteSeconds: number;
}

/**
 * Defines a plug "Category" that is allowed to be plugged into a socket of this type.
 * This should be compared against a given plug item's DestinyInventoryItemDefinition.plug.plugCategoryHash, which indicates the plug item's category.
 */
export interface DestinyPlugWhitelistEntryDefinition {
	/**
	 * The hash identifier of the Plug Category to compare against the plug item's plug.plugCategoryHash.
	 * Note that this does NOT relate to any Definition in itself, it is only used for comparison purposes.
	 */
	categoryHash: number;
	/**
	 * The string identifier for the category, which is here mostly for debug purposes.
	 */
	categoryIdentifier: string;
}

/**
 * Sockets on an item are organized into Categories visually.
 * You can find references to the socket category defined on an item's DestinyInventoryItemDefinition.sockets.socketCategories property.
 * This has the display information for rendering the categories' header, and a hint for how the UI should handle showing this category.
 */
export interface DestinySocketCategoryDefinition {
	displayProperties: DestinyDisplayPropertiesDefinition;
	/**
	 * A string hinting to the game's UI system about how the sockets in this category should be displayed.
	 * BNet doesn't use it: it's up to you to find valid values and make your own special UI if you want to honor this category style.
	 */
	uiCategoryStyle: number;
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
