import {DestinyItemComponentSetOfint32, DestinyItemComponentSetOfint64, DictionaryComponentResponseOfint32AndDestinyVendorSaleItemComponent, DictionaryComponentResponseOfint64AndDestinyCharacterActivitiesComponent, DictionaryComponentResponseOfint64AndDestinyCharacterComponent, DictionaryComponentResponseOfint64AndDestinyCharacterProgressionComponent, DictionaryComponentResponseOfint64AndDestinyCharacterRenderComponent, DictionaryComponentResponseOfint64AndDestinyInventoryComponent, DictionaryComponentResponseOfint64AndDestinyKiosksComponent, SingleComponentResponseOfDestinyCharacterActivitiesComponent, SingleComponentResponseOfDestinyCharacterComponent, SingleComponentResponseOfDestinyCharacterProgressionComponent, SingleComponentResponseOfDestinyCharacterRenderComponent, SingleComponentResponseOfDestinyInventoryComponent, SingleComponentResponseOfDestinyItemComponent, SingleComponentResponseOfDestinyItemInstanceComponent, SingleComponentResponseOfDestinyItemObjectivesComponent, SingleComponentResponseOfDestinyItemPerksComponent, SingleComponentResponseOfDestinyItemRenderComponent, SingleComponentResponseOfDestinyItemSocketsComponent, SingleComponentResponseOfDestinyItemStatsComponent, SingleComponentResponseOfDestinyItemTalentGridComponent, SingleComponentResponseOfDestinyKiosksComponent, SingleComponentResponseOfDestinyProfileComponent, SingleComponentResponseOfDestinyVendorCategoriesComponent, SingleComponentResponseOfDestinyVendorComponent, SingleComponentResponseOfDestinyVendorReceiptsComponent} from '../';

/**
 * The response for GetDestinyProfile, with components for character and item-level data.
 */
export interface DestinyProfileResponse {
	/**
	 * Recent, refundable purchases you have made from vendors. When will you use it? Couldn't say...
	 * COMPONENT TYPE: VendorReceipts
	 */
	vendorReceipts: SingleComponentResponseOfDestinyVendorReceiptsComponent;
	/**
	 * The profile-level inventory of the Destiny Profile.
	 * COMPONENT TYPE: ProfileInventories
	 */
	profileInventory: SingleComponentResponseOfDestinyInventoryComponent;
	/**
	 * The profile-level currencies owned by the Destiny Profile.
	 * COMPONENT TYPE: ProfileCurrencies
	 */
	profileCurrencies: SingleComponentResponseOfDestinyInventoryComponent;
	/**
	 * The basic information about the Destiny Profile (formerly "Account").
	 * COMPONENT TYPE: Profiles
	 */
	profile: SingleComponentResponseOfDestinyProfileComponent;
	/**
	 * Items available from Kiosks that are available Profile-wide (i.e. across all characters)
	 * This component returns information about what Kiosk items are available to you on a *Profile* level. It is theoretically possible for Kiosks to have items gated by specific Character as well. If you ever have those, you will find them on the characterKiosks property.
	 * COMPONENT TYPE: Kiosks
	 */
	profileKiosks: SingleComponentResponseOfDestinyKiosksComponent;
	/**
	 * Basic information about each character, keyed by the CharacterId.
	 * COMPONENT TYPE: Characters
	 */
	characters: DictionaryComponentResponseOfint64AndDestinyCharacterComponent;
	/**
	 * The character-level non-equipped inventory items, keyed by the Character's Id.
	 * COMPONENT TYPE: CharacterInventories
	 */
	characterInventories: DictionaryComponentResponseOfint64AndDestinyInventoryComponent;
	/**
	 * Character-level progression data, keyed by the Character's Id.
	 * COMPONENT TYPE: CharacterProgressions
	 */
	characterProgressions: DictionaryComponentResponseOfint64AndDestinyCharacterProgressionComponent;
	/**
	 * Character rendering data - a minimal set of info needed to render a character in 3D - keyed by the Character's Id.
	 * COMPONENT TYPE: CharacterRenderData
	 */
	characterRenderData: DictionaryComponentResponseOfint64AndDestinyCharacterRenderComponent;
	/**
	 * Character activity data - the activities available to this character and its status, keyed by the Character's Id.
	 * COMPONENT TYPE: CharacterActivities
	 */
	characterActivities: DictionaryComponentResponseOfint64AndDestinyCharacterActivitiesComponent;
	/**
	 * The character's equipped items, keyed by the Character's Id.
	 * COMPONENT TYPE: CharacterEquipment
	 */
	characterEquipment: DictionaryComponentResponseOfint64AndDestinyInventoryComponent;
	/**
	 * Items available from Kiosks that are available to a specific character as opposed to the account as a whole. It must be combined with data from the profileKiosks property to get a full picture of the character's available items to check out of a kiosk.
	 * This component returns information about what Kiosk items are available to you on a *Character* level. Usually, kiosk items will be earned for the entire Profile (all characters) at once. To find those, look in the profileKiosks property.
	 * COMPONENT TYPE: Kiosks
	 */
	characterKiosks: DictionaryComponentResponseOfint64AndDestinyKiosksComponent;
	/**
	 * Information about instanced items across all returned characters, keyed by the item's instance ID.
	 * COMPONENT TYPE: [See inside the DestinyItemComponentSet contract for component types.]
	 */
	itemComponents: DestinyItemComponentSetOfint64;
}

/**
 * The response contract for GetDestinyCharacter, with components that can be returned for character and item-level data.
 */
export interface DestinyCharacterResponse {
	/**
	 * The character-level non-equipped inventory items.
	 * COMPONENT TYPE: CharacterInventories
	 */
	inventory: SingleComponentResponseOfDestinyInventoryComponent;
	/**
	 * Base information about the character in question.
	 * COMPONENT TYPE: Characters
	 */
	character: SingleComponentResponseOfDestinyCharacterComponent;
	/**
	 * Character progression data, including Milestones.
	 * COMPONENT TYPE: CharacterProgressions
	 */
	progressions: SingleComponentResponseOfDestinyCharacterProgressionComponent;
	/**
	 * Character rendering data - a minimal set of information about equipment and dyes used for rendering.
	 * COMPONENT TYPE: CharacterRenderData
	 */
	renderData: SingleComponentResponseOfDestinyCharacterRenderComponent;
	/**
	 * Activity data - info about current activities available to the player.
	 * COMPONENT TYPE: CharacterActivities
	 */
	activities: SingleComponentResponseOfDestinyCharacterActivitiesComponent;
	/**
	 * Equipped items on the character.
	 * COMPONENT TYPE: CharacterEquipment
	 */
	equipment: SingleComponentResponseOfDestinyInventoryComponent;
	/**
	 * Items available from Kiosks that are available to this specific character.
	 * COMPONENT TYPE: Kiosks
	 */
	kiosks: SingleComponentResponseOfDestinyKiosksComponent;
	/**
	 * The set of components belonging to the player's instanced items.
	 * COMPONENT TYPE: [See inside the DestinyItemComponentSet contract for component types.]
	 */
	itemComponents: DestinyItemComponentSetOfint64;
}

/**
 * The response object for retrieving an individual instanced item. None of these components are relevant for an item that doesn't have an "itemInstanceId": for those, get your information from the DestinyInventoryDefinition.
 */
export interface DestinyItemResponse {
	/**
	 * If the item is on a character, this will return the ID of the character that is holding the item.
	 */
	characterId?: string;
	/**
	 * Common data for the item relevant to its non-instanced properties.
	 * COMPONENT TYPE: ItemCommonData
	 */
	item: SingleComponentResponseOfDestinyItemComponent;
	/**
	 * Basic instance data for the item.
	 * COMPONENT TYPE: ItemInstances
	 */
	instance: SingleComponentResponseOfDestinyItemInstanceComponent;
	/**
	 * Information specifically about the item's objectives.
	 * COMPONENT TYPE: ItemObjectives
	 */
	objectives: SingleComponentResponseOfDestinyItemObjectivesComponent;
	/**
	 * Information specifically about the perks currently active on the item.
	 * COMPONENT TYPE: ItemPerks
	 */
	perks: SingleComponentResponseOfDestinyItemPerksComponent;
	/**
	 * Information about how to render the item in 3D.
	 * COMPONENT TYPE: ItemRenderData
	 */
	renderData: SingleComponentResponseOfDestinyItemRenderComponent;
	/**
	 * Information about the computed stats of the item: power, defense, etc...
	 * COMPONENT TYPE: ItemStats
	 */
	stats: SingleComponentResponseOfDestinyItemStatsComponent;
	/**
	 * Information about the talent grid attached to the item. Talent nodes can provide a variety of benefits and abilities, and in Destiny 2 are used almost exclusively for the character's "Builds".
	 * COMPONENT TYPE: ItemTalentGrids
	 */
	talentGrid: SingleComponentResponseOfDestinyItemTalentGridComponent;
	/**
	 * Information about the sockets of the item: which are currently active, what potential sockets you could have and the stats/abilities/perks you can gain from them.
	 * COMPONENT TYPE: ItemSockets
	 */
	sockets: SingleComponentResponseOfDestinyItemSocketsComponent;
}

/**
 * A response containing all of the components for a vendor.
 */
export interface DestinyVendorResponse {
	/**
	 * The base properties of the vendor.
	 * COMPONENT TYPE: Vendors
	 */
	vendor: SingleComponentResponseOfDestinyVendorComponent;
	/**
	 * Categories that the vendor has available, and references to the sales therein.
	 * COMPONENT TYPE: VendorCategories
	 */
	categories: SingleComponentResponseOfDestinyVendorCategoriesComponent;
	/**
	 * Sales, keyed by the vendorItemIndex of the item being sold.
	 * COMPONENT TYPE: VendorSales
	 */
	sales: DictionaryComponentResponseOfint32AndDestinyVendorSaleItemComponent;
	/**
	 * Item components, keyed by the vendorItemIndex of the active sale items.
	 * COMPONENT TYPE: [See inside the DestinyItemComponentSet contract for component types.]
	 */
	items: DestinyItemComponentSetOfint32;
}
