import {DestinyItemQuantity} from '../';
import {DestinyDisplayPropertiesDefinition} from './common';

/**
 * Milestones are an in-game concept where they're attempting to tell you what you can do next in-game.
 * If that sounds a lot like Advisors in Destiny 1, it is! So we threw out Advisors in the Destiny 2 API and tacked all of the data we would have put on Advisors onto Milestones instead.
 * Each Milestone represents something going on in the game right now:
 * - A "ritual activity" you can perform, like nightfall
 * - A "special event" that may have activities related to it, like Taco Tuesday (there's no Taco Tuesday in Destiny 2)
 * - A checklist you can fulfill, like helping your Clan complete all of its weekly objectives
 * - A tutorial quest you can play through, like the introduction to the Crucible.
 * Most of these milestones appear in game as well. Some of them are BNet only, because we're so extra. You're welcome.
 */
export interface DestinyMilestoneDefinition {
	displayProperties: DestinyDisplayPropertiesDefinition;
	/**
	 * A custom image someone made just for the milestone. Isn't that special?
	 */
	image: string;
	/**
	 * An enumeration listing one of the possible types of milestones. Check out the DestinyMilestoneType enum for more info!
	 */
	milestoneType: DestinyMilestoneType;
	/**
	 * If True, then the Milestone has been integrated with BNet's recruiting feature.
	 */
	recruitable: boolean;
	/**
	 * If the milestone has a friendly identifier for association with other features - such as Recruiting - that identifier can be found here. This is "friendly" in that it looks better in a URL than whatever the identifier for the Milestone actually is.
	 */
	friendlyName: string;
	/**
	 * If TRUE, this entry should be returned in the list of milestones for the "Explore Destiny" (i.e. new BNet homepage) features of Bungie.net (as long as the underlying event is active)
	 */
	showInExplorer: boolean;
	/**
	 * A shortcut for clients - and the server - to understand whether we can predict the start and end dates for this event. In practice, there are multiple ways that an event could have predictable date ranges, but not all events will be able to be predicted via any mechanism (for instance, events that are manually triggered on and off)
	 */
	hasPredictableDates: boolean;
	/**
	 * The full set of possible Quests that give the overview of the Milestone event/activity in question. Only one of these can be active at a time for a given Conceptual Milestone, but many of them may be "available" for the user to choose from. (for instance, with Milestones you can choose from the three available Quests, but only one can be active at a time) Keyed by the quest item.
	 */
	quests: {[field: number]: DestinyMilestoneQuestDefinition};
	/**
	 * If this milestone can provide rewards, this will define the categories into which the individual reward entries are placed.
	 */
	rewards: {[field: number]: DestinyMilestoneRewardCategoryDefinition};
	/**
	 * Sometimes, milestones will have rewards provided by Vendors. This definition gives the information needed to understand which vendors are relevant, the order in which they should be returned if order matters, and the conditions under which the Vendor is relevant to the user.
	 */
	vendors: DestinyMilestoneVendorDefinition[];
	/**
	 * Sometimes, milestones will have arbitrary values associated with them that are of interest to us or to third party developers. This is the collection of those values' definitions, keyed by the identifier of the value and providing useful definition information such as localizable names and descriptions for the value.
	 */
	values: {[field: string]: DestinyMilestoneValueDefinition};
	/**
	 * Some milestones are explicit objectives that you can see and interact with in the game. Some milestones are more conceptual, built by BNet to help advise you on activities and events that happen in-game but that aren't explicitly shown in game as Milestones. If this is TRUE, you can see this as a milestone in the game. If this is FALSE, it's an event or activity you can participate in, but you won't see it as a Milestone in the game's UI.
	 */
	isInGameMilestone: boolean;
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
 * The type of milestone. Milestones can be Tutorials, one-time/triggered/non-repeating but not necessarily tutorials, or Repeating Milestones.
 */
export enum DestinyMilestoneType {
	Unknown = 0,
	Tutorial = 1,
	OneTime = 2,
	Weekly = 3,
	Daily = 4,
	Special = 5,
}

/**
 * Any data we need to figure out whether this Quest Item is the currently active one for the conceptual Milestone. Even just typing this description, I already regret it.
 */
export interface DestinyMilestoneQuestDefinition {
	/**
	 * The item representing this Milestone quest. Use this hash to look up the DestinyInventoryItemDefinition for the quest to find its steps and human readable data.
	 */
	questItemHash: number;
	/**
	 * The individual quests may have different definitions from the overall milestone: if there's a specific active quest, use these displayProperties instead of that of the overall DestinyMilestoneDefinition.
	 */
	displayProperties: DestinyDisplayPropertiesDefinition;
	/**
	 * If populated, this image can be shown instead of the generic milestone's image when this quest is live, or it can be used to show a background image for the quest itself that differs from that of the Activity or the Milestone.
	 */
	overrideImage: string;
	/**
	 * The rewards you will get for completing this quest, as best as we could extract them from our data. Sometimes, it'll be a decent amount of data. Sometimes, it's going to be sucky. Sorry.
	 */
	questRewards: DestinyMilestoneQuestRewardsDefinition;
	/**
	 * The full set of all possible "conceptual activities" that are related to this Milestone. Tiers or alternative modes of play within these conceptual activities will be defined as sub-entities. Keyed by the Conceptual Activity Hash. Use the key to look up DestinyActivityDefinition.
	 */
	activities: {[field: number]: DestinyMilestoneActivityDefinition};
}

/**
 * If rewards are given in a quest - as opposed to overall in the entire Milestone - there's way less to track. We're going to simplify this contract as a result. However, this also gives us the opportunity to potentially put more than just item information into the reward data if we're able to mine it out in the future. Remember this if you come back and ask "why are quest reward items nested inside of their own class?"
 */
export interface DestinyMilestoneQuestRewardsDefinition {
	/**
	 * The items that represent your reward for completing the quest.
	 * Be warned, these could be "dummy" items: items that are only used to render a good-looking in-game tooltip, but aren't the actual items themselves.
	 * For instance, when experience is given there's often a dummy item representing "experience", with quantity being the amount of experience you got. We don't have a programmatic association between those and whatever Progression is actually getting that experience... yet.
	 */
	items: DestinyMilestoneQuestRewardItem[];
}

/**
 * A subclass of DestinyItemQuantity, that provides not just the item and its quantity but also information that BNet can - at some point - use internally to provide more robust runtime information about the item's qualities.
 * If you want it, please ask! We're just out of time to wire it up right now. Or a clever person just may do it with our existing endpoints.
 */
export interface DestinyMilestoneQuestRewardItem {
	/**
	 * The quest reward item *may* be associated with a vendor. If so, this is that vendor. Use this hash to look up the DestinyVendorDefinition.
	 */
	vendorHash?: number;
	/**
	 * The quest reward item *may* be associated with a vendor. If so, this is the index of the item being sold, which we can use at runtime to find instanced item information for the reward item.
	 */
	vendorItemIndex?: number;
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

/**
 * Milestones can have associated activities which provide additional information about the context, challenges, modifiers, state etc... related to this Milestone.
 * Information we need to be able to return that data is defined here, along with Tier data to establish a relationship between a conceptual Activity and its difficulty levels and variants.
 */
export interface DestinyMilestoneActivityDefinition {
	/**
	 * The "Conceptual" activity hash. Basically, we picked the lowest level activity and are treating it as the canonical definition of the activity for rendering purposes.
	 * If you care about the specific difficulty modes and variations, use the activities under "Variants".
	 */
	conceptualActivityHash: number;
	/**
	 * A milestone-referenced activity can have many variants, such as Tiers or alternative modes of play.
	 * Even if there is only a single variant, the details for these are represented within as a variant definition.
	 * It is assumed that, if this DestinyMilestoneActivityDefinition is active, then all variants should be active.
	 * If a Milestone could ever split the variants' active status conditionally, they should all have their own DestinyMilestoneActivityDefinition instead! The potential duplication will be worth it for the obviousness of processing and use.
	 */
	variants: {[field: number]: DestinyMilestoneActivityVariantDefinition};
}

/**
 * Represents a variant on an activity for a Milestone: a specific difficulty tier, or a specific activity variant for example.
 * These will often have more specific details, such as an associated Guided Game, progression steps, tier-specific rewards, and custom values.
 */
export interface DestinyMilestoneActivityVariantDefinition {
	/**
	 * The hash to use for looking up the variant Activity's definition (DestinyActivityDefinition), where you can find its distinguishing characteristics such as difficulty level and recommended light level.
	 * Frequently, that will be the only distinguishing characteristics in practice, which is somewhat of a bummer.
	 */
	activityHash: number;
	/**
	 * If you care to do so, render the variants in the order prescribed by this value.
	 * When you combine live Milestone data with the definition, the order becomes more useful because you'll be cross-referencing between the definition and live data.
	 */
	order: number;
}

/**
 * The definition of a category of rewards, that contains many individual rewards.
 */
export interface DestinyMilestoneRewardCategoryDefinition {
	/**
	 * Identifies the reward category. Only guaranteed unique within this specific component!
	 */
	categoryHash: number;
	/**
	 * The string identifier for the category, if you want to use it for some end. Guaranteed unique within the specific component.
	 */
	categoryIdentifier: string;
	/**
	 * Hopefully this is obvious by now.
	 */
	displayProperties: DestinyDisplayPropertiesDefinition;
	/**
	 * If this milestone can provide rewards, this will define the sets of rewards that can be earned, the conditions under which they can be acquired, internal data that we'll use at runtime to determine whether you've already earned or redeemed this set of rewards, and the category that this reward should be placed under.
	 */
	rewardEntries: {[field: number]: DestinyMilestoneRewardEntryDefinition};
	/**
	 * If you want to use BNet's recommended order for rendering categories programmatically, use this value and compare it to other categories to determine the order in which they should be rendered. I don't feel great about putting this here, I won't lie.
	 */
	order: number;
}

/**
 * The definition of a specific reward, which may be contained in a category of rewards and that has optional information about how it is obtained.
 */
export interface DestinyMilestoneRewardEntryDefinition {
	/**
	 * The identifier for this reward entry. Runtime data will refer to reward entries by this hash. Only guaranteed unique within the specific Milestone.
	 */
	rewardEntryHash: number;
	/**
	 * The string identifier, if you care about it. Only guaranteed unique within the specific Milestone.
	 */
	rewardEntryIdentifier: string;
	/**
	 * The items you will get as rewards, and how much of it you'll get.
	 */
	items: DestinyItemQuantity[];
	/**
	 * If this reward is redeemed at a Vendor, this is the hash of the Vendor to go to in order to redeem the reward. Use this hash to look up the DestinyVendorDefinition.
	 */
	vendorHash?: number;
	/**
	 * For us to bother returning this info, we should be able to return some kind of information about why these rewards are grouped together. This is ideally that information. Look at how confident I am that this will always remain true.
	 */
	displayProperties: DestinyDisplayPropertiesDefinition;
	/**
	 * If you want to follow BNet's ordering of these rewards, use this number within a given category to order the rewards. Yeah, I know. I feel dirty too.
	 */
	order: number;
}

/**
 * If the Milestone or a component has vendors whose inventories could/should be displayed that are relevant to it, this will return the vendor in question.
 * It also contains information we need to determine whether that vendor is actually relevant at the moment, given the user's current state.
 */
export interface DestinyMilestoneVendorDefinition {
	/**
	 * The hash of the vendor whose wares should be shown as associated with the Milestone.
	 */
	vendorHash: number;
}

/**
 * The definition for information related to a key/value pair that is relevant for a particular Milestone or component within the Milestone.
 * This lets us more flexibly pass up information that's useful to someone, even if it's not necessarily us.
 */
export interface DestinyMilestoneValueDefinition {
	key: string;
	displayProperties: DestinyDisplayPropertiesDefinition;
}
