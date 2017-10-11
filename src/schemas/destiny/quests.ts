/**
 * Data regarding the progress of a Quest for a specific character. Quests are composed of multiple steps, each with potentially multiple objectives: this QuestStatus will return Objective data for the *currently active* step in this quest.
 */
export interface DestinyQuestStatus {
	/**
	 * The hash identifier for the Quest Item. (Note: Quests are defined as Items, and thus you would use this to look up the quest's DestinyInventoryItemDefinition). For information on all steps in the quest, you can then examine its DestinyInventoryItemDefinition.setData property for Quest Steps (which are *also* items). You can use the Item Definition to display human readable data about the overall quest.
	 */
	questHash: number;
	/**
	 * The hash identifier of the current Quest Step, which is also a DestinyInventoryItemDefinition. You can use this to get human readable data about the current step and what to do in that step.
	 */
	stepHash: number;
	/**
	 * A step can have multiple objectives. This will give you the progress for each objective in the current step, in the order in which they are rendered in-game.
	 */
	stepObjectives: DestinyObjectiveProgress[];
	/**
	 * Whether or not the quest is tracked
	 */
	tracked: boolean;
	/**
	 * The current Quest Step will be an instanced item in the player's inventory. If you care about that, this is the instance ID of that item.
	 */
	itemInstanceId: string;
	/**
	 * Whether or not the whole quest has been completed, regardless of whether or not you have redeemed the rewards for the quest.
	 */
	completed: boolean;
	/**
	 * Whether or not you have redeemed rewards for this quest.
	 */
	redeemed: boolean;
	/**
	 * Whether or not you have started this quest.
	 */
	started: boolean;
	/**
	 * If the quest has a related Vendor that you should talk to in order to initiate the quest/earn rewards/continue the quest, this will be the hash identifier of that Vendor. Look it up its DestinyVendorDefinition.
	 */
	vendorHash?: number;
}

/**
 * Returns data about a character's status with a given Objective. Combine with DestinyObjectiveDefinition static data for display purposes.
 */
export interface DestinyObjectiveProgress {
	/**
	 * The unique identifier of the Objective being referred to. Use to look up the DestinyObjectiveDefinition in static data.
	 */
	objectiveHash: number;
	/**
	 * If the Objective has a Destination associated with it, this is the unique identifier of the Destination being referred to. Use to look up the DestinyDestinationDefinition in static data. This will give localized data about *where* in the universe the objective should be achieved.
	 */
	destinationHash?: number;
	/**
	 * If the Objective has an Activity associated with it, this is the unique identifier of the Activity being referred to. Use to look up the DestinyActivityDefinition in static data. This will give localized data about *what* you should be playing for the objective to be achieved.
	 */
	activityHash?: number;
	/**
	 * If progress has been made, and the progress can be measured numerically, this will be the value of that progress. You can compare it to the DestinyObjectiveDefinition.completionValue property for current vs. upper bounds, and use DestinyObjectiveDefinition.valueStyle to determine how this should be rendered. Note that progress, in Destiny 2, need not be a literal numeric progression. It could be one of a number of possible values, even a Timestamp. Always examine DestinyObjectiveDefinition.valueStyle before rendering progress.
	 */
	progress?: number;
	/**
	 * Whether or not the Objective is completed.
	 */
	complete: boolean;
}
