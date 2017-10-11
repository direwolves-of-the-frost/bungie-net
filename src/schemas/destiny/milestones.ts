import {DestinyChallengeStatus} from './challenges';
import {DestinyQuestStatus} from './quests';

/**
 * Represents a runtime instance of a user's milestone status. Live Milestone data should be combined with DestinyMilestoneDefinition data to show the user a picture of what is available for them to do in the game, and their status in regards to said "things to do." Consider it a big, wonky to-do list, or Advisors 3.0 for those who remember the Destiny 1 API.
 */
export interface DestinyMilestone {
	/**
	 * The unique identifier for the Milestone. Use it to look up the DestinyMilestoneDefinition, so you can combine the other data in this contract with static definition data.
	 */
	milestoneHash: number;
	/**
	 * Indicates what quests are available for this Milestone. Usually this will be only a single Quest, but some quests have multiple available that you can choose from at any given time. All possible quests for a milestone can be found in the DestinyMilestoneDefinition, but they must be combined with this Live data to determine which one(s) are actually active right now. It is possible for Milestones to not have any quests.
	 */
	availableQuests: DestinyMilestoneQuest[];
	/**
	 * Milestones may have arbitrary key/value pairs associated with them, for data that users will want to know about but that doesn't fit neatly into any of the common components such as Quests. A good example of this would be - if this existed in Destiny 1 - the number of wins you currently have on your Trials of Osiris ticket. Looking in the DestinyMilestoneDefinition, you can use the string identifier of this dictionary to look up more info about the value, including localized string content for displaying the value. The value in the dictionary is the floating point number. The definition will tell you how to format this number.
	 */
	values: {[field: string]: number};
	/**
	 * A milestone may have one or more active vendors that are "related" to it (that provide rewards, or that are the initiators of the Milestone). I already regret this, even as I'm typing it. You see, sometimes a milestone may be directly correlated with a set of vendors that provide varying tiers of rewards. The player may not be able to interact with one or more of those vendors. This will return the hashes of the Vendors that the player *can* interact with, allowing you to show their current inventory as rewards or related items to the Milestone or its activities.
	 */
	vendorHashes: number[];
	/**
	 * If the entity to which this component is attached has known active Rewards for the player, this will detail information about those rewards, keyed by the RewardEntry Hash. (See DestinyMilestoneDefinition for more information about Reward Entries) Note that these rewards are not for the Quests related to the Milestone. Think of these as "overview/checklist" rewards that may be provided for Milestones that may provide rewards for performing a variety of tasks that aren't under a specific Quest.
	 */
	rewards: DestinyMilestoneRewardCategory[];
	/**
	 * If known, this is the date when the event last began or refreshed. It will only be populated for events with fixed and repeating start and end dates.
	 */
	startDate?: string;
	/**
	 * If known, this is the date when the event will next end or repeat. It will only be populated for events with fixed and repeating start and end dates.
	 */
	endDate?: string;
}

/**
 * If a Milestone has one or more Quests, this will contain the live information for the character's status with one of those quests.
 */
export interface DestinyMilestoneQuest {
	/**
	 * Quests are defined as Items in content. As such, this is the hash identifier of the DestinyInventoryItemDefinition that represents this quest. It will have pointers to all of the steps in the quest, and display information for the quest (title, description, icon etc) Individual steps will be referred to in the Quest item's DestinyInventoryItemDefinition.setData property, and themselves are Items with their own renderable data.
	 */
	questItemHash: number;
	/**
	 * The current status of the quest for the character making the request.
	 */
	status: DestinyQuestStatus;
	/**
	 * *IF* the Milestone has an active Activity that can give you greater details about what you need to do, it will be returned here. Remember to associate this with the DestinyMilestoneDefinition's activities to get details about the activity, including what specific quest it is related to if you have multiple quests to choose from.
	 */
	activity: DestinyMilestoneActivity;
	/**
	 * The activities referred to by this quest can have many associated challenges. They are all contained here, with activityHashes so that you can associate them with the specific activity variants in which they can be found. In retrospect, I probably should have put these under the specific Activity Variants, but it's too late to change it now. Theoretically, a quest without Activities can still have Challenges, which is why this is on a higher level than activity/variants, but it probably should have been in both places. That may come as a later revision.
	 */
	challenges: DestinyChallengeStatus[];
}

/**
 * Sometimes, we know the specific activity that the Milestone wants you to play. This entity provides additional information about that Activity and all of its variants. (sometimes there's only one variant, but I think you get the point)
 */
export interface DestinyMilestoneActivity {
	/**
	 * The hash of an arbitrarily chosen variant of this activity. We'll go ahead and call that the "canonical" activity, because if you're using this value you should only use it for properties that are common across the variants: things like the name of the activity, it's location, etc... Use this hash to look up the DestinyActivityDefinition of this activity for rendering data.
	 */
	activityHash: number;
	/**
	 * If the activity has modifiers, this will be the list of modifiers that all variants have in common. Perform lookups against DestinyActivityModifierDefinition which defines the modifier being applied to get at the modifier data. Note that, in the DestiyActivityDefinition, you will see many more modifiers than this being referred to: those are all *possible* modifiers for the activity, not the active ones. Use only the active ones to match what's really live.
	 */
	modifierHashes: number[];
	/**
	 * If you want more than just name/location/etc... you're going to have to dig into and show the variants of the conceptual activity. These will differ in seemingly arbitrary ways, like difficulty level and modifiers applied. Show it in whatever way tickles your fancy.
	 */
	variants: DestinyMilestoneActivityVariant[];
}

/**
 * Represents custom data that we know about an individual variant of an activity.
 */
export interface DestinyMilestoneActivityVariant {
	/**
	 * The hash for the specific variant of the activity related to this milestone. You can pull more detailed static info from the DestinyActivityDefinition, such as difficulty level.
	 */
	activityHash: number;
	/**
	 * An OPTIONAL component: if it makes sense to talk about this activity variant in terms of whether or not it has been completed or what progress you have made in it, this will be returned. Otherwise, this will be NULL.
	 */
	completionStatus: DestinyMilestoneActivityCompletionStatus;
}

/**
 * Represents this player's personal completion status for the Activity under a Milestone, if the activity has trackable completion and progress information. (most activities won't, or the concept won't apply. For instance, it makes sense to talk about a tier of a raid as being Completed or having progress, but it doesn't make sense to talk about a Crucible Playlist in those terms.
 */
export interface DestinyMilestoneActivityCompletionStatus {
	/**
	 * If the activity has been "completed", that information will be returned here.
	 */
	completed: boolean;
	/**
	 * If the Activity has discrete "phases" that we can track, that info will be here. Otherwise, this value will be NULL. Note that this is a list and not a dictionary: the order implies the ascending order of phases or progression in this activity.
	 */
	phases: DestinyMilestoneActivityPhase[];
}

/**
 * Represents whatever information we can return about an explicit phase in an activity. In the future, I hope we'll have more than just "guh, you done gone and did something," but for the forseeable future that's all we've got. I'm making it more than just a list of booleans out of that overly-optimistic hope.
 */
export interface DestinyMilestoneActivityPhase {
	/**
	 * Indicates if the phase has been completed.
	 */
	complete: boolean;
}

/**
 * Represents a category of "summary" rewards that can be earned for the Milestone regardless of specific quest rewards that can be earned.
 */
export interface DestinyMilestoneRewardCategory {
	/**
	 * Look up the relevant DestinyMilestoneDefinition, and then use rewardCategoryHash to look up the category info in DestinyMilestoneDefinition.rewards.
	 */
	rewardCategoryHash: number;
	/**
	 * The individual reward entries for this category, and their status.
	 */
	entries: DestinyMilestoneRewardEntry[];
}

/**
 * The character-specific data for a milestone's reward entry. See DestinyMilestoneDefinition for more information about Reward Entries.
 */
export interface DestinyMilestoneRewardEntry {
	/**
	 * The identifier for the reward entry in question. It is important to look up the related DestinyMilestoneRewardEntryDefinition to get the static details about the reward, which you can do by looking up the milestone's DestinyMilestoneDefinition and examining the DestinyMilestoneDefinition.rewards[rewardCategoryHash].rewardEntries[rewardEntryHash] data.
	 */
	rewardEntryHash: number;
	/**
	 * If TRUE, the player has earned this reward.
	 */
	earned: boolean;
	/**
	 * If TRUE, the player has redeemed/picked up/obtained this reward. Feel free to alias this to "gotTheShinyBauble" in your own codebase.
	 */
	redeemed: boolean;
}

/**
 * Represents localized, extended content related to Milestones. This is intentionally returned by a separate endpoint and not with Character-level Milestone data because we do not put localized data into standard Destiny responses, both for brevity of response and for caching purposes. If you really need this data, hit the Milestone Content endpoint.
 */
export interface DestinyMilestoneContent {
	/**
	 * The "About this Milestone" text from the Firehose.
	 */
	about: string;
	/**
	 * The Current Status of the Milestone, as driven by the Firehose.
	 */
	status: string;
	/**
	 * A list of tips, provided by the Firehose.
	 */
	tips: string[];
	/**
	 * If DPS has defined items related to this Milestone, they can categorize those items in the Firehose. That data will then be returned as item categories here.
	 */
	itemCategories: DestinyMilestoneContentItemCategory[];
}

/**
 * Part of our dynamic, localized Milestone content is arbitrary categories of items. These are built in our content management system, and thus aren't the same as programmatically generated rewards.
 */
export interface DestinyMilestoneContentItemCategory {
	title: string;
	itemHashes: number[];
}

/**
 * Information about milestones, presented in a character state-agnostic manner. Combine this data with DestinyMilestoneDefinition to get a full picture of the milestone, which is basically a checklist of things to do in the game. Think of this as GetPublicAdvisors 3.0, for those who used the Destiny 1 API.
 */
export interface DestinyPublicMilestone {
	/**
	 * The hash identifier for the milestone. Use it to look up the DestinyMilestoneDefinition for static data about the Milestone.
	 */
	milestoneHash: number;
	/**
	 * A milestone not need have even a single quest, but if there are active quests they will be returned here.
	 */
	availableQuests: DestinyPublicMilestoneQuest[];
	/**
	 * Sometimes milestones - or activities active in milestones - will have relevant vendors. These are the vendors that are currently relevant.
	 */
	vendorHashes: number[];
	/**
	 * If known, this is the date when the Milestone started/became active.
	 */
	startDate?: string;
	/**
	 * If known, this is the date when the Milestone will expire/recycle/end.
	 */
	endDate?: string;
}

export interface DestinyPublicMilestoneQuest {
	/**
	 * Quests are defined as Items in content. As such, this is the hash identifier of the DestinyInventoryItemDefinition that represents this quest. It will have pointers to all of the steps in the quest, and display information for the quest (title, description, icon etc) Individual steps will be referred to in the Quest item's DestinyInventoryItemDefinition.setData property, and themselves are Items with their own renderable data.
	 */
	questItemHash: number;
	/**
	 * A milestone need not have an active activity, but if there is one it will be returned here, along with any variant and additional information.
	 */
	activity: DestinyPublicMilestoneActivity;
	/**
	 * For the given quest there could be 0-to-Many challenges: mini quests that you can perform in the course of doing this quest, that may grant you rewards and benefits.
	 */
	challenges: DestinyPublicMilestoneChallenge[];
}

/**
 * A milestone may have one or more conceptual Activities associated with it, and each of those conceptual activities could have a variety of variants, modes, tiers, what-have-you. Our attempts to determine what qualifies as a conceptual activity are, unfortunately, janky. So if you see missing modes or modes that don't seem appropriate to you, let us know and I'll buy you a beer if we ever meet up in person.
 */
export interface DestinyPublicMilestoneActivity {
	/**
	 * The hash identifier of the activity that's been chosen to be considered the canonical "conceptual" activity definition. This may have many variants, defined herein.
	 */
	activityHash: number;
	/**
	 * The activity may have 0-to-many modifiers: if it does, this will contain the hashes to the DestinyActivityModifierDefinition that defines the modifier being applied.
	 */
	modifierHashes: number[];
	/**
	 * Every relevant variation of this conceptual activity, including the conceptual activity itself, have variants defined here.
	 */
	variants: DestinyPublicMilestoneActivityVariant[];
}

/**
 * Represents a variant of an activity that's relevant to a milestone.
 */
export interface DestinyPublicMilestoneActivityVariant {
	/**
	 * The hash identifier of this activity variant. Examine the activity's definition in the Manifest database to determine what makes it a distinct variant. Usually it will be difficulty level or whether or not it is a guided game variant of the activity, but theoretically it could be distinguished in any arbitrary way.
	 */
	activityHash: number;
}

/**
 * A Milestone can have many Challenges. Challenges are just extra Objectives that provide a fun way to mix-up play and provide extra rewards.
 */
export interface DestinyPublicMilestoneChallenge {
	/**
	 * The objective for the Challenge, which should have human-readable data about what needs to be done to accomplish the objective. Use this hash to look up the DestinyObjectiveDefinition.
	 */
	objectiveHash: number;
	/**
	 * IF the Objective is related to a specific Activity, this will be that activity's hash. Use it to look up the DestinyActivityDefinition for additional data to show.
	 */
	activityHash?: number;
}
