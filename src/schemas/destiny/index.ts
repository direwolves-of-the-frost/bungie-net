import {PlatformErrorCodes} from '../exceptions';
import {DestinyMaterialRequirement} from './definitions';

import * as Definitions from './definitions';
export {Definitions};
import * as HistoricalStats from './historical-stats';
export {HistoricalStats};
import * as Config from './config';
export {Config};
import * as Responses from './responses';
export {Responses};
import * as Entities from './entities';
export {Entities};
import * as Vendors from './vendors';
export {Vendors};
import * as Components from './components';
export {Components};
import * as Progression from './progression';
export {Progression};
import * as Milestones from './milestones';
export {Milestones};
import * as Quests from './quests';
export {Quests};
import * as Challenges from './challenges';
export {Challenges};
import * as Character from './character';
export {Character};
import * as Perks from './perks';
export {Perks};
import * as Requests from './requests';
export {Requests};
import * as Activities from './activities';
export {Activities};

/**
 * Information about a current character's status with a Progression. A progression is a value that can increase with activity and has levels. Think Character Level and Reputation Levels. Combine this "live" data with the related DestinyProgressionDefinition for a full picture of the Progression.
 */
export interface DestinyProgression {
	/**
	 * The hash identifier of the Progression in question. Use it to look up the DestinyProgressionDefinition in static data.
	 */
	progressionHash: number;
	/**
	 * The amount of progress earned today for this progression.
	 */
	dailyProgress: number;
	/**
	 * If this progression has a daily limit, this is that limit.
	 */
	dailyLimit: number;
	/**
	 * The amount of progress earned toward this progression in the current week.
	 */
	weeklyProgress: number;
	/**
	 * If this progression has a weekly limit, this is that limit.
	 */
	weeklyLimit: number;
	/**
	 * This is the total amount of progress obtained overall for this progression (for instance, the total amount of Character Level experience earned)
	 */
	currentProgress: number;
	/**
	 * This is the level of the progression (for instance, the Character Level).
	 */
	level: number;
	/**
	 * This is the maximum possible level you can achieve for this progression (for example, the maximum character level obtainable)
	 */
	levelCap: number;
	/**
	 * Progressions define their levels in "steps". Since the last step may be repeatable, the user may be at a higher level than the actual Step achieved in the progression. Not necessarily useful, but potentially interesting for those cruising the API. Relate this to the "steps" property of the DestinyProgression to see which step the user is on, if you care about that. (Note that this is Content Version dependent since it refers to indexes.)
	 */
	stepIndex: number;
	/**
	 * The amount of progression (i.e. "Experience") needed to reach the next level of this Progression. Jeez, progression is such an overloaded word.
	 */
	progressToNextLevel: number;
	/**
	 * The total amount of progression (i.e. "Experience") needed in order to reach the next level.
	 */
	nextLevelAt: number;
}

/**
 * There are many Progressions in Destiny (think Character Level, or Reputation). These are the various "Scopes" of Progressions, which affect many things: * Where/if they are stored * How they are calculated * Where they can be used in other game logic
 */
export enum DestinyProgressionScope {
	Account = 0,
	Character = 1,
	Clan = 2,
	Item = 3,
	ImplicitFromEquipment = 4,
	Mapped = 5,
	MappedAggregate = 6,
	MappedStat = 7,
	MappedUnlockValue = 8,
}

/**
 * If progression is earned, this determines whether the progression shows visual effects on the character or its item - or neither.
 */
export enum DestinyProgressionStepDisplayEffect {
	None = 0,
	Character = 1,
	Item = 2,
}

/**
 * Used in a number of Destiny contracts to return data about an item stack and its quantity. Can optionally return an itemInstanceId if the item is instanced - in which case, the quantity returned will be 1. If it's not... uh, let me know okay? Thanks.
 */
export interface DestinyItemQuantity {
	/**
	 * The hash identifier for the item in question. Use it to look up the item's DestinyInventoryItemDefinition.
	 */
	itemHash: number;
	/**
	 * If this quantity is referring to a specific instance of an item, this will have the item's instance ID. Normally, this will be null.
	 */
	itemInstanceId?: string;
	/**
	 * The amount of the item needed/available depending on the context of where DestinyItemQuantity is being used.
	 */
	quantity: number;
}

export enum TierType {
	Unknown = 0,
	Currency = 1,
	Basic = 2,
	Common = 3,
	Rare = 4,
	Superior = 5,
	Exotic = 6,
}

export enum BucketScope {
	Character = 0,
	Account = 1,
}

export enum BucketCategory {
	Invisible = 0,
	Item = 1,
	Currency = 2,
	Equippable = 3,
	Ignored = 4,
}

export enum ItemLocation {
	Unknown = 0,
	Inventory = 1,
	Vault = 2,
	Vendor = 3,
	Postmaster = 4,
}

/**
 * When a Stat (DestinyStatDefinition) is aggregated, this is the rules used for determining the level and formula used for aggregation.
 * * CharacterAverage = apply a weighted average using the related DestinyStatGroupDefinition on the DestinyInventoryItemDefinition across the character's equipped items. See both of those definitions for details. * Character = don't aggregate: the stat should be located and used directly on the character. * Item = don't aggregate: the stat should be located and used directly on the item.
 */
export enum DestinyStatAggregationType {
	CharacterAverage = 0,
	Character = 1,
	Item = 2,
}

export enum EquippingItemBlockAttributes {
	None = 0,
	EquipOnAcquire = 1,
}

export interface DyeReference {
	channelHash: number;
	dyeHash: number;
}

/**
 * When a Vendor Interaction provides rewards, they'll either let you choose one or let you have all of them. This determines which it will be.
 */
export enum DestinyVendorInteractionRewardSelection {
	None = 0,
	One = 1,
	All = 2,
}

/**
 * This determines the type of reply that a Vendor will have during an Interaction.
 */
export enum DestinyVendorReplyType {
	Accept = 0,
	Decline = 1,
	Complete = 2,
}

/**
 * Determines how items are sorted in an inventory bucket.
 */
export enum DestinyItemSortType {
	ItemId = 0,
	Timestamp = 1,
	StackSize = 2,
}

/**
 * The action that happens when the user attempts to refund an item.
 */
export enum DestinyVendorItemRefundPolicy {
	NotRefundable = 0,
	DeletesItem = 1,
	RevokesLicense = 2,
}

/**
 * This enumeration represents the most restrictive type of gating that is being performed by an entity. This is useful as a shortcut to avoid a lot of lookups when determining whether the gating on an Entity applies to everyone equally, or to their specific Profile or Character states.
 * None = There is no gating on this item. Global = The gating on this item is based entirely on global game state. It will be gated the same for everyone. Clan = The gating on this item is at the Clan level. For instance, if you're gated by Clan level this will be the case. Profile = The gating includes Profile-specific checks, but not on the Profile's characters. An example of this might be when you acquire an Emblem: the Emblem will be available in your Kiosk for all characters in your Profile from that point onward. Character = The gating includes Character-specific checks, including character level restrictions. An example of this might be an item that you can't purchase from a Vendor until you reach a specific Character Level. Item = The gating includes item-specific checks. For BNet, this generally implies that we'll show this data only on a character level or deeper. AssumedWorstCase = The unlocks and checks being used for this calculation are of an unknown type and are used for unknown purposes. For instance, if some great person decided that an unlock value should be globally scoped, but then the game changes it using character-specific data in a way that BNet doesn't know about. Because of the open-ended potential for this to occur, many unlock checks for "globally" scoped unlock data may be assumed as the worst case unless it has been specifically whitelisted as otherwise. That sucks, but them's the breaks.
 */
export enum DestinyGatingScope {
	None = 0,
	Global = 1,
	Clan = 2,
	Profile = 3,
	Character = 4,
	Item = 5,
	AssumedWorstCase = 6,
}

/**
 * If you're showing an unlock value in the UI, this is the format in which it should be shown. You'll have to build your own algorithms on the client side to determine how best to render these options.
 */
export enum DestinyUnlockValueUIStyle {
	Automatic = 0,
	Fraction = 1,
	Checkbox = 2,
	Percentage = 3,
	DateTime = 4,
	FractionFloat = 5,
	Integer = 6,
	TimeDuration = 7,
	Hidden = 8,
}

/**
 * Some Objectives provide perks, generally as part of providing some kind of interesting modifier for a Challenge or Quest. This indicates when the Perk is granted.
 */
export enum DestinyObjectiveGrantStyle {
	WhenIncomplete = 0,
	WhenComplete = 1,
	Always = 2,
}

export enum DamageType {
	None = 0,
	Kinetic = 1,
	Arc = 2,
	Thermal = 3,
	Void = 4,
	Raid = 5,
}

export enum DestinyActivityNavPointType {
	Inactive = 0,
	PrimaryObjective = 1,
	SecondaryObjective = 2,
	TravelObjective = 3,
	PublicEventObjective = 4,
	AmmoCache = 5,
	PointTypeFlag = 6,
	CapturePoint = 7,
	DefensiveEncounter = 8,
	GhostInteraction = 9,
	KillAi = 10,
	QuestItem = 11,
	PatrolMission = 12,
	Incoming = 13,
	ArenaObjective = 14,
	AutomationHint = 15,
	TrackedQuest = 16,
}

/**
 * The various known UI styles in which an item can be highlighted. It'll be up to you to determine what you want to show based on this highlighting, BNet doesn't have any assets that correspond to these states. And yeah, RiseOfIron and Comet have their own special highlight states. Don't ask me, I can't imagine they're still used.
 */
export enum ActivityGraphNodeHighlightType {
	None = 0,
	Normal = 1,
	Hyper = 2,
	Comet = 3,
	RiseOfIron = 4,
}

/**
 * Activity Modes are grouped into a few possible broad categories.
 */
export enum DestinyActivityModeCategory {
	None = 0,
	PvE = 1,
	PvP = 2,
}

export enum DestinySocketVisibility {
	Visible = 0,
	Hidden = 1,
	HiddenWhenEmpty = 2,
}

/**
 * As you run into items that need to be classified for Milestone purposes in ways that we cannot infer via Babel or Bonbobo-sourced data, add a new classification here and use a string constant to represent it in the local item config file.
 * NOTE: This is not all of the item types available, and some of these are holdovers from Destiny 1 that may or may not still exist.
 */
export enum SpecialItemType {
	None = 0,
	SpecialCurrency = 1,
	Armor = 8,
	Weapon = 9,
	Engram = 23,
	Consumable = 24,
	ExchangeMaterial = 25,
	MissionReward = 27,
	Currency = 29,
}

/**
 * An enumeration that indicates the high-level "type" of the item, attempting to iron out the context specific differences for specific instances of an entity. For instance, though a weapon may be of various wepaon "Types", in DestinyItemType they are all classified as "Weapon". This allows for better filtering on a higher level of abstraction for the concept of types.
 *  This enum is provided for historical compatibility with Destiny 1, but an ideal alternative is to use DestinyItemCategoryDefinitions and the DestinyItemDefinition.itemCategories property instead. Item Categories allow for arbitrary hierarchies of specificity, and for items to belong to multiple categories across multiple hierarchies simultaneously. For this enum, we pick a single type as a "best guess" fit.
 *  NOTE: This is not all of the item types available, and some of these are holdovers from Destiny 1 that may or may not still exist.
 */
export enum DestinyItemType {
	None = 0,
	Currency = 1,
	Armor = 2,
	Weapon = 3,
	Message = 7,
	Engram = 8,
	Consumable = 9,
	ExchangeMaterial = 10,
	MissionReward = 11,
	QuestStep = 12,
	QuestStepComplete = 13,
	Emblem = 14,
	Quest = 15,
	Subclass = 16,
	ClanBanner = 17,
	Aura = 18,
	Mod = 19,
}

/**
 * This Enumeration further classifies items by more specific categorizations than DestinyItemType. The "Sub-Type" is where we classify and categorize items one step further in specificity: "Auto Rifle" instead of just "Weapon" for example, or "Vanguard Bounty" instead of merely "Bounty".
 * These sub-types are provided for historical compatibility with Destiny 1, but an ideal alternative is to use DestinyItemCategoryDefinitions and the DestinyItemDefinition.itemCategories property instead. Item Categories allow for arbitrary hierarchies of specificity, and for items to belong to multiple categories across multiple hierarchies simultaneously. For this enum, we pick a single type as a "best guess" fit.
 * NOTE: This is not all of the item types available, and some of these are holdovers from Destiny 1 that may or may not still exist.
 */
export enum DestinyItemSubType {
	None = 0,
	Crucible = 1,
	Vanguard = 2,
	Exotic = 5,
	AutoRifle = 6,
	Shotgun = 7,
	Machinegun = 8,
	HandCannon = 9,
	RocketLauncher = 10,
	FusionRifle = 11,
	SniperRifle = 12,
	PulseRifle = 13,
	ScoutRifle = 14,
	Crm = 16,
	Sidearm = 17,
	Sword = 18,
	Mask = 19,
	Shader = 20,
}

export enum DestinyClass {
	Titan = 0,
	Hunter = 1,
	Warlock = 2,
	Unknown = 3,
}

export enum DestinyComponentType {
	None = 0,
	Profiles = 100,
	VendorReceipts = 101,
	ProfileInventories = 102,
	ProfileCurrencies = 103,
	Characters = 200,
	CharacterInventories = 201,
	CharacterProgressions = 202,
	CharacterRenderData = 203,
	CharacterActivities = 204,
	CharacterEquipment = 205,
	ItemInstances = 300,
	ItemObjectives = 301,
	ItemPerks = 302,
	ItemRenderData = 303,
	ItemStats = 304,
	ItemSockets = 305,
	ItemTalentGrids = 306,
	ItemCommonData = 307,
	ItemPlugStates = 308,
	Vendors = 400,
	VendorCategories = 401,
	VendorSales = 402,
	Kiosks = 500,
}

export enum ItemBindStatus {
	NotBound = 0,
	BoundToCharacter = 1,
	BoundToAccount = 2,
	BoundToGuild = 3,
}

/**
 * Whether you can transfer an item, and why not if you can't.
 */
export enum TransferStatuses {
	CanTransfer = 0,
	ItemIsEquipped = 1,
	NotTransferrable = 2,
	NoRoomInDestination = 4,
}

export enum ItemState {
	None = 0,
	Locked = 1,
	Tracked = 2,
}

/**
 * A flags enumeration indicating the versions of the game that a given user has purchased.
 */
export enum DestinyGameVersions {
	None = 0,
	Destiny2 = 1,
}

export enum DestinyRace {
	Human = 0,
	Awoken = 1,
	Exo = 2,
	Unknown = 3,
}

export enum DestinyGender {
	Male = 0,
	Female = 1,
	Unknown = 2,
}

/**
 * Represents the "Live" data that we can obtain about a Character's status with a specific Activity. This will tell you whether the character can participate in the activity, as well as some other basic mutable information.
 * Meant to be combined with static DestinyActivityDefinition data for a full picture of the Activity.
 */
export interface DestinyActivity {
	/**
	 * The hash identifier of the Activity. Use this to look up the DestinyActivityDefinition of the activity.
	 */
	activityHash: number;
	/**
	 * If true, then the activity should have a "new" indicator in the Director UI.
	 */
	isNew: boolean;
	/**
	 * If true, the user is allowed to lead a Fireteam into this activity.
	 */
	canLead: boolean;
	/**
	 * If true, the user is allowed to join with another Fireteam in this activity.
	 */
	canJoin: boolean;
	/**
	 * If true, we both have the ability to know that the user has completed this activity and they have completed it. Unfortunately, we can't necessarily know this for all activities. As such, this should probably only be used if you already know in advance which specific activities you wish to check.
	 */
	isCompleted: boolean;
	/**
	 * If true, the user should be able to see this activity.
	 */
	isVisible: boolean;
	/**
	 * The difficulty level of the activity, if applicable.
	 */
	displayLevel?: number;
	/**
	 * The recommended light level for the activity, if applicable.
	 */
	recommendedLight?: number;
	/**
	 * A DestinyActivityDifficultyTier enum value indicating the difficulty of the activity.
	 */
	difficultyTier: DestinyActivityDifficultyTier;
}

/**
 * An enumeration representing the potential difficulty levels of an activity. Their names are... more qualitative than quantitative.
 */
export enum DestinyActivityDifficultyTier {
	Trivial = 0,
	Easy = 1,
	Normal = 2,
	Challenging = 3,
	Hard = 4,
	Brave = 5,
	AlmostImpossible = 6,
	Impossible = 7,
}

/**
 * Represents a stat on an item *or* Character (NOT a Historical Stat, but a physical attribute stat like Attack, Defense etc...)
 */
export interface DestinyStat {
	/**
	 * The hash identifier for the Stat. Use it to look up the DestinyStatDefinition for static data about the stat.
	 */
	statHash: number;
	/**
	 * The current value of the Stat.
	 */
	value: number;
	/**
	 * The highest possible value for the stat, if we were able to compute it. (I wouldn't necessarily trust this value right now. I would like to improve its calculation in later iterations of the API. Consider this a placeholder for desired future functionality)
	 */
	maximumValue: number;
}

/**
 * The reasons why an item cannot be equipped, if any. Many flags can be set, or "None" if
 */
export enum EquipFailureReason {
	None = 0,
	ItemUnequippable = 1,
	ItemUniqueEquipRestricted = 2,
	ItemFailedUnlockCheck = 4,
	ItemFailedLevelCheck = 8,
	ItemNotOnCharacter = 16,
}

/**
 * I see you've come to find out more about Talent Nodes. I'm so sorry. Talent Nodes are the conceptual, visual nodes that appear on Talent Grids. Talent Grids, in Destiny 1, were found on almost every instanced item: they had Nodes that could be activated to change the properties of the item. In Destiny 2, Talent Grids only exist for Builds/Subclasses, and while the basic concept is the same (Nodes can be activated once you've gained sufficient Experience on the Item, and provide effects), there are some new concepts from Destiny 1. Examine DestinyTalentGridDefinition and its subordinates for more information. This is the "Live" information for the current status of a Talent Node on a specific item. Talent Nodes have many Steps, but only one can be active at any one time: and it is the Step that determines both the visual and the game state-changing properties that the Node provides. Examine this and DestinyTalentNodeStepDefinition carefully. *IMPORTANT NOTE* Talent Nodes are, unfortunately, Content Version DEPENDENT. Though they refer to hashes for Nodes and Steps, those hashes are not guaranteed to be immutable across content versions. This is a source of great exasperation for me, but as a result anyone using Talent Grid data must ensure that the content version of their static content matches that of the server responses before showing or making decisions based on talent grid data.
 */
export interface DestinyTalentNode {
	/**
	 * The index of the Talent Node being referred to (an index into DestinyTalentGridDefinition.nodes[]). CONTENT VERSION DEPENDENT.
	 */
	nodeIndex: number;
	/**
	 * The hash of the Talent Node being referred to (in DestinyTalentGridDefinition.nodes). Deceptively CONTENT VERSION DEPENDENT. We have no guarantee of the hash's immutability between content versions.
	 */
	nodeHash: number;
	/**
	 * An DestinyTalentNodeState enum value indicating the node's state: whether it can be activated or swapped, and why not if neither can be performed.
	 */
	state: DestinyTalentNodeState;
	/**
	 * If true, the node is activated: it's current step then provides its benefits.
	 */
	isActivated: boolean;
	/**
	 * The currently relevant Step for the node. It is this step that has rendering data for the node and the benefits that are provided if the node is activated. (the actual rules for benefits provided are extremely complicated in theory, but with how Talent Grids are being used in Destiny 2 you don't have to worry about a lot of those old Destiny 1 rules.) This is an index into: DestinyTalentGridDefinition.nodes[nodeIndex].steps[stepIndex]
	 */
	stepIndex: number;
	/**
	 * If the node has material requirements to be activated, this is the list of those requirements.
	 */
	materialsToUpgrade: DestinyMaterialRequirement[];
	/**
	 * The progression level required on the Talent Grid in order to be able to activate this talent node. Talent Grids have their own Progression - similar to Character Level, but in this case it is experience related to the item itself.
	 */
	activationGridLevel: number;
	/**
	 * If you want to show a progress bar or circle for how close this talent node is to being activate-able, this is the percentage to show. It follows the node's underlying rules about when the progress bar should first show up, and when it should be filled.
	 */
	progressPercent: number;
	/**
	 * Whether or not the talent node is actually visible in the game's UI. Whether you want to show it in your own UI is up to you! I'm not gonna tell you who to sock it to.
	 */
	hidden: boolean;
	/**
	 * This property has some history. A talent grid can provide stats on both the item it's related to and the character equipping the item. This returns data about those stat bonuses.
	 */
	nodeStatsBlock: DestinyTalentNodeStatBlock;
}

export enum DestinyTalentNodeState {
	Invalid = 0,
	CanUpgrade = 1,
	NoPoints = 2,
	NoPrerequisites = 3,
	NoSteps = 4,
	NoUnlock = 5,
	NoMaterial = 6,
	NoGridLevel = 7,
	SwappingLocked = 8,
	MustSwap = 9,
	Complete = 10,
	Unknown = 11,
	CreationOnly = 12,
	Hidden = 13,
}

/**
 * This property has some history. A talent grid can provide stats on both the item it's related to and the character equipping the item. This returns data about those stat bonuses.
 */
export interface DestinyTalentNodeStatBlock {
	/**
	 * The stat benefits conferred when this talent node is activated for the current Step that is active on the node.
	 */
	currentStepStats: DestinyStat[];
	/**
	 * This is a holdover from the old days of Destiny 1, when a node could be activated multiple times, conferring multiple steps worth of benefits: you would use this property to show what activating the "next" step on the node would provide vs. what the current step is providing. While Nodes are currently not being used this way, the underlying system for this functionality still exists. I hesitate to remove this property while the ability for designers to make such a talent grid still exists. Whether you want to show it is up to you.
	 */
	nextStepStats: DestinyStat[];
}

export enum VendorItemStatus {
	Success = 0,
	NoInventorySpace = 1,
	NoFunds = 2,
	NoProgression = 4,
	NoUnlock = 8,
	NoQuantity = 16,
	OutsidePurchaseWindow = 32,
	NotAvailable = 64,
	UniquenessViolation = 128,
	UnknownError = 256,
	AlreadySelling = 512,
	Unsellable = 1024,
	SellingInhibited = 2048,
	AlreadyOwned = 4096,
}

/**
 * Indicates the status of an "Unlock Flag" on a Character or Profile.
 * These are individual bits of state that can be either set or not set, and sometimes provide interesting human-readable information in their related DestinyUnlockDefinition.
 */
export interface DestinyUnlockStatus {
	/**
	 * The hash identifier for the Unlock Flag. Use to lookup DestinyUnlockDefinition for static data. Not all unlocks have human readable data - in fact, most don't. But when they do, it can be very useful to show. Even if they don't have human readable data, you might be able to infer the meaning of an unlock flag with a bit of experimentation...
	 */
	unlockHash: number;
	/**
	 * Whether the unlock flag is set.
	 */
	isSet: boolean;
}

/**
 * The results of a bulk Equipping operation performed through the Destiny API.
 */
export interface DestinyEquipItemResults {
	equipResults: DestinyEquipItemResult[];
}

/**
 * The results of an Equipping operation performed through the Destiny API.
 */
export interface DestinyEquipItemResult {
	/**
	 * The instance ID of the item in question (all items that can be equipped must, but definition, be Instanced and thus have an Instance ID that you can use to refer to them)
	 */
	itemInstanceId: string;
	/**
	 * A PlatformErrorCodes enum indicating whether it succeeded, and if it failed why.
	 */
	equipStatus: PlatformErrorCodes;
}
