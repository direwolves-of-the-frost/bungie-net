import {DamageType, DestinyProgression, DestinyStat, DestinyTalentNode, EquipFailureReason, ItemBindStatus, ItemLocation, ItemState, TransferStatuses} from '../';
import {DestinyPerkReference} from '../perks';
import {DestinyObjectiveProgress} from '../quests';

/**
 * The base item component, filled with properties that are generally useful to know in any item request or that don't feel worthwhile to put in their own component.
 */
export interface DestinyItemComponent {
	/**
	 * The identifier for the item's definition, which is where most of the useful static information for the item can be found.
	 */
	itemHash: number;
	/**
	 * If the item is instanced, it will have an instance ID. Lack of an instance ID implies that the item has no distinct local qualities aside from stack size.
	 */
	itemInstanceId?: string;
	/**
	 * The quantity of the item in this stack. Note that Instanced items cannot stack. If an instanced item, this value will always be 1 (as the stack has exactly one item in it)
	 */
	quantity: number;
	/**
	 * If the item is bound to a location, it will be specified in this enum.
	 */
	bindStatus: ItemBindStatus;
	/**
	 * An easy reference for where the item is located. Redundant if you got the item from an Inventory, but useful when making detail calls on specific items.
	 */
	location: ItemLocation;
	/**
	 * The hash identifier for the specific inventory bucket in which the item is located.
	 */
	bucketHash: number;
	/**
	 * If there is a known error state that would cause this item to not be transferable, this Flags enum will indicate all of those error states. Otherwise, it will be 0 (CanTransfer).
	 */
	transferStatus: TransferStatuses;
	/**
	 * If the item can be locked, this will indicate that state.
	 */
	lockable: boolean;
	/**
	 * A flags enumeration indicating the states of the item: whether it's tracked or locked for example.
	 */
	state: ItemState;
}

/**
 * If an item is "instanced", this will contain information about the item's instance that doesn't fit easily into other components. One might say this is the "essential" instance data for the item.
 * Items are instanced if they require information or state that can vary. For instance, weapons are Instanced: they are given a unique identifier, uniquely generated stats, and can have their properties altered. Non-instanced items have none of these things: for instance, Glimmer has no unique properties aside from how much of it you own.
 * You can tell from an item's definition whether it will be instanced or not by looking at the DestinyInventoryItemDefinition's definition.inventory.isInstanceItem property.
 */
export interface DestinyItemInstanceComponent {
	/**
	 * If the item has a damage type, this is the item's current damage type.
	 */
	damageType: DamageType;
	/**
	 * The current damage type's hash, so you can look up localized info and icons for it.
	 */
	damageTypeHash?: number;
	/**
	 * The item stat that we consider to be "primary" for the item. For instance, this would be "Attack" for Weapons or "Defense" for armor.
	 */
	primaryStat: DestinyStat;
	/**
	 * The Item's "Level" has the most significant bearing on its stats, such as Light and Power.
	 */
	itemLevel: number;
	/**
	 * The "Quality" of the item has a lesser - but still impactful - bearing on stats like Light and Power.
	 */
	quality: number;
	/**
	 * Is the item currently equipped on the given character?
	 */
	isEquipped: boolean;
	/**
	 * If this is an equippable item, you can check it here. There are permanent as well as transitory reasons why an item might not be able to be equipped: check cannotEquipReason for details.
	 */
	canEquip: boolean;
	/**
	 * If the item cannot be equipped until you reach a certain level, that level will be reflected here.
	 */
	equipRequiredLevel: number;
	/**
	 * Sometimes, there are limitations to equipping that are represented by character-level flags called "unlocks".
	 * This is a list of flags that they need in order to equip the item that the character has not met. Use these to look up the descriptions to show in your UI by looking up the relevant DestinyUnlockDefinitions for the hashes.
	 */
	unlockHashesRequiredToEquip: number[];
	/**
	 * If you cannot equip the item, this is a flags enum that enumerates all of the reasons why you couldn't equip the item. You may need to refine your UI further by using unlockHashesRequiredToEquip and equipRequiredLevel.
	 */
	cannotEquipReason: EquipFailureReason;
}

/**
 * Items can have objectives and progression. When you request this block, you will obtain information about any Objectives and progression tied to this item.
 */
export interface DestinyItemObjectivesComponent {
	/**
	 * If the item has a hard association with objectives, your progress on them will be defined here.
	 * Objectives are our standard way to describe a series of tasks that have to be completed for a reward.
	 */
	objectives: DestinyObjectiveProgress[];
}

/**
 * Instanced items can have perks: benefits that the item bestows.
 * These are related to DestinySandboxPerkDefinition, and sometimes - but not always - have human readable info. When they do, they are the icons and text that you see in an item's tooltip.
 * Talent Grids, Sockets, and the item itself can apply Perks, which are then summarized here for your convenience.
 */
export interface DestinyItemPerksComponent {
	/**
	 * The list of perks to display in an item tooltip - and whether or not they have been activated.
	 */
	perks: DestinyPerkReference[];
}

/**
 * Many items can be rendered in 3D. When you request this block, you will obtain the custom data needed to render this specific instance of the item.
 */
export interface DestinyItemRenderComponent {
	/**
	 * If you should use custom dyes on this item, it will be indicated here.
	 */
	useCustomDyes: boolean;
	/**
	 * A dictionary for rendering gear components, with:
	 * key = Art Arrangement Region Index
	 * value = The chosen Arrangement Index for the Region, based on the value of a stat on the item used for making the choice.
	 */
	artRegions: {[field: number]: number};
}

/**
 * If you want the stats on an item's instanced data, get this component.
 * These are stats like Attack, Defense etc... and *not* historical stats.
 * Note that some stats have additional computation in-game at runtime - for instance, Magazine Size - and thus these stats might not be 100% accurate compared to what you see in-game for some stats. I know, it sucks. I hate it too.
 */
export interface DestinyItemStatsComponent {
	/**
	 * If the item has stats that it provides (damage, defense, etc...), it will be given here.
	 */
	stats: {[field: number]: DestinyStat};
}

/**
 * Instanced items can have sockets, which are slots on the item where plugs can be inserted.
 * Sockets are a bit complex: be sure to examine the documentation on the DestinyInventoryItemDefinition's "socket" block and elsewhere on these objects for more details.
 */
export interface DestinyItemSocketsComponent {
	/**
	 * The list of all sockets on the item, and their status information.
	 */
	sockets: DestinyItemSocketState[];
}

/**
 * The status of a given item's socket. (which plug is inserted, if any: whether it is enabled, what "reusable" plugs can be inserted, etc...)
 */
export interface DestinyItemSocketState {
	/**
	 * The currently active plug, if any.
	 * Note that, because all plugs are statically defined, its effect on stats and perks can be statically determined using the plug item's definition. The stats and perks can be taken at face value on the plug item as the stats and perks it will provide to the user/item.
	 */
	plugHash?: number;
	/**
	 * Even if a plug is inserted, it doesn't mean it's enabled.
	 * This flag indicates whether the plug is active and providing its benefits.
	 */
	isEnabled: boolean;
	/**
	 * If a plug is inserted but not enabled, this will be populated with indexes into the plug item definition's plug.enabledRules property, so that you can show the reasons why it is not enabled.
	 */
	enableFailIndexes: number[];
	/**
	 * If the item supports reusable plugs, this is the list of plug item hashes that are currently allowed to be used for this socket. (sometimes restrictions may cause reusable plugs defined on the item definition to not be valid, so you should trust the instanced reusablePlugHashes list rather than the definition's list)
	 * A Reusable Plug is a plug that you can *always* insert into this socket, regardless of whether or not you have the plug in your inventory. In practice, a socket will *either* have reusable plugs *or* it will allow for plugs in your inventory to be inserted. See DestinyInventoryItemDefinition.socket for more info.
	 */
	reusablePlugHashes: number[];
}

/**
 * Well, we're here in Destiny 2, and Talent Grids are unfortunately still around.
 * The good news is that they're pretty much only being used for certain base information on items and for Builds/Subclasses. The bad news is that they still suck. If you really want this information, grab this component.
 * An important note is that talent grids are defined as such:
 * A Grid has 1:M Nodes, which has 1:M Steps.
 * Any given node can only have a single step active at one time, which represents the actual visual contents and effects of the Node (for instance, if you see a "Super Cool Bonus" node, the actual icon and text for the node is coming from the current Step of that node).
 * Nodes can be grouped into exclusivity sets *and* as of D2, exclusivity groups (which are collections of exclusivity sets that affect each other).
 * See DestinyTalentGridDefinition for more information. Brace yourself, the water's cold out there in the deep end.
 */
export interface DestinyItemTalentGridComponent {
	/**
	 * Most items don't have useful talent grids anymore, but Builds in particular still do.
	 * You can use this hash to lookup the DestinyTalentGridDefinition attached to this item, which will be crucial for understanding the node values on the item.
	 */
	talentGridHash: number;
	/**
	 * Detailed information about the individual nodes in the talent grid.
	 * A node represents a single visual "pip" in the talent grid or Build detail view, though each node may have multiple "steps" which indicate the actual bonuses and visual representation of that node.
	 */
	nodes: DestinyTalentNode[];
	/**
	 * Indicates whether the talent grid on this item is completed, and thus whether it should have a gold border around it.
	 * Only will be true if the item actually *has* a talent grid, and only then if it is completed (i.e. every exclusive set has an activated node, and every non-exclusive set node has been activated)
	 */
	isGridComplete: boolean;
	/**
	 * If the item has a progression, it will be detailed here. A progression means that the item can gain experience. Thresholds of experience are what determines whether and when a talent node can be activated.
	 */
	gridProgression: DestinyProgression;
}
