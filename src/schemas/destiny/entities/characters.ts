import {DestinyActivity, DestinyClass, DestinyGender, DestinyProgression, DestinyRace, DyeReference} from '../';
import {BungieMembershipType} from '../../';
import {DestinyCharacterCustomization, DestinyCharacterPeerView} from '../character';
import {DestinyActivityModeType} from '../historical-stats/definitions';
import {DestinyMilestone} from '../milestones';
import {DestinyFactionProgression} from '../progression';
import {DestinyObjectiveProgress, DestinyQuestStatus} from '../quests';

/**
 * This component contains base properties of the character. You'll probably want to always request this component, but hey you do you.
 */
export interface DestinyCharacterComponent {
	/**
	 * Every Destiny Profile has a membershipId. This is provided on the character as well for convenience.
	 */
	membershipId: string;
	/**
	 * membershipType tells you the platform on which the character plays. Examine the BungieMembershipType enumeration for possible values.
	 */
	membershipType: BungieMembershipType;
	/**
	 * The unique identifier for the character.
	 */
	characterId: string;
	/**
	 * The last date that the user played Destiny.
	 */
	dateLastPlayed: string;
	/**
	 * If the user is currently playing, this is how long they've been playing.
	 */
	minutesPlayedThisSession: string;
	/**
	 * If this value is 525,600, then they played Destiny for a year. Or they're a very dedicated Rent fan. Note that this includes idle time, not just time spent actually in activities shooting things.
	 */
	minutesPlayedTotal: string;
	/**
	 * The user's calculated "Light Level". Light level is an indicator of your power that mostly matters in the end game, once you've reached the maximum character level: it's a level that's dependent on the average Attack/Defense power of your items.
	 */
	light: number;
	/**
	 * Your character's stats, such as Agility, Resilience, etc... *not* historical stats.
	 * You'll have to call a different endpoint for those.
	 */
	stats: {[field: number]: number};
	/**
	 * Use this hash to look up the character's DestinyRaceDefinition.
	 */
	raceHash: number;
	/**
	 * Use this hash to look up the character's DestinyGenderDefinition.
	 */
	genderHash: number;
	/**
	 * Use this hash to look up the character's DestinyClassDefinition.
	 */
	classHash: number;
	/**
	 * Mostly for historical purposes at this point, this is an enumeration for the character's race.
	 * It'll be preferable in the general case to look up the related definition: but for some people this was too convenient to remove.
	 */
	raceType: DestinyRace;
	/**
	 * Mostly for historical purposes at this point, this is an enumeration for the character's class.
	 * It'll be preferable in the general case to look up the related definition: but for some people this was too convenient to remove.
	 */
	classType: DestinyClass;
	/**
	 * Mostly for historical purposes at this point, this is an enumeration for the character's Gender.
	 * It'll be preferable in the general case to look up the related definition: but for some people this was too convenient to remove. And yeah, it's an enumeration and not a boolean. Fight me.
	 */
	genderType: DestinyGender;
	/**
	 * A shortcut path to the user's currently equipped emblem image. If you're just showing summary info for a user, this is more convenient than examining their equipped emblem and looking up the definition.
	 */
	emblemPath: string;
	/**
	 * A shortcut path to the user's currently equipped emblem background image. If you're just showing summary info for a user, this is more convenient than examining their equipped emblem and looking up the definition.
	 */
	emblemBackgroundPath: string;
	/**
	 * The hash of the currently equipped emblem for the user. Can be used to look up the DestinyInventoryItemDefinition.
	 */
	emblemHash: number;
	/**
	 * The progression that indicates your character's level. Not their light level, but their character level: you know, the thing you max out a couple hours in and then ignore for the sake of light level.
	 */
	levelProgression: DestinyProgression;
	/**
	 * The "base" level of your character, not accounting for any light level.
	 */
	baseCharacterLevel: number;
	/**
	 * A number between 0 and 100, indicating the whole and fractional % remaining to get to the next character level.
	 */
	percentToNextLevel: number;
}

/**
 * This component returns anything that could be considered "Progression" on a user: data where the user is gaining levels, reputation, completions, rewards, etc...
 */
export interface DestinyCharacterProgressionComponent {
	/**
	 * A Dictionary of all known progressions for the Character, keyed by the Progression's hash.
	 * Not all progressions have user-facing data, but those who do will have that data contained in the DestinyProgressionDefinition.
	 */
	progressions: {[field: number]: DestinyProgression};
	/**
	 * A dictionary of all known Factions, keyed by the Faction's hash. It contains data about this character's status with the faction.
	 */
	factions: {[field: number]: DestinyFactionProgression};
	/**
	 * Milestones are related to the simple progressions shown in the game, but return additional and hopefully helpful information for users about the specifics of the Milestone's status.
	 */
	milestones: {[field: number]: DestinyMilestone};
	/**
	 * If the user has any active quests, the quests' statuses will be returned here.
	 * Note that quests have been largely supplanted by Milestones, but that doesn't mean that they won't make a comeback independent of milestones at some point.
	 */
	quests: DestinyQuestStatus[];
	/**
	 * Sometimes, you have items in your inventory that don't have instances, but still have Objective information. This provides you that objective information for uninstanced items.
	 * This dictionary is keyed by the item's hash: which you can use to look up the name and description for the overall task(s) implied by the objective. The value is the list of objectives for this item, and their statuses.
	 */
	uninstancedItemObjectives: {[field: number]: DestinyObjectiveProgress[]};
}

/**
 * Only really useful if you're attempting to render the character's current appearance in 3D, this returns a bare minimum of information, pre-aggregated, that you'll need to perform that rendering. Note that you need to combine this with other 3D assets and data from our servers.
 * Examine the Javascript returned by https://bungie.net/sharedbundle/spasm to see how we use this data, but be warned: the rabbit hole goes pretty deep.
 */
export interface DestinyCharacterRenderComponent {
	/**
	 * Custom dyes, calculated by iterating over the character's equipped items. Useful for pre-fetching all of the dye data needed from our server.
	 */
	customDyes: DyeReference[];
	/**
	 * This is actually something that Spasm.js *doesn't* do right now, and that we don't return assets for yet. This is the data about what character customization options you picked. You can combine this with DestinyCharacterCustomizationOptionDefinition to show some cool info, and hopefully someday to actually render a user's face in 3D. We'll see if we ever end up with time for that.
	 */
	customization: DestinyCharacterCustomization;
	/**
	 * A minimal view of:
	 * - Equipped items
	 * - The rendering-related custom options on those equipped items
	 * Combined, that should be enough to render all of the items on the equipped character.
	 */
	peerView: DestinyCharacterPeerView;
}

/**
 * This component holds activity data for a character. It will tell you about the character's current activity status, as well as activities that are available to the user.
 */
export interface DestinyCharacterActivitiesComponent {
	/**
	 * The last date that the user started playing an activity.
	 */
	dateActivityStarted: string;
	/**
	 * The list of activities that the user can play.
	 */
	availableActivities: DestinyActivity[];
	/**
	 * If the user is in an activity, this will be the hash of the Activity being played. Note that you must combine this info with currentActivityModeHash to get a real picture of what the user is doing right now. For instance, PVP "Activities" are just maps: it's the ActivityMode that determines what type of PVP game they're playing.
	 */
	currentActivityHash: number;
	/**
	 * If the user is in an activity, this will be the hash of the activity mode being played. Combine with currentActivityHash to give a person a full picture of what they're doing right now.
	 */
	currentActivityModeHash: number;
	currentActivityModeType?: number;
	currentActivityModeHashes: number[];
	currentActivityModeTypes: DestinyActivityModeType[];
	currentPlaylistActivityHash?: number;
	/**
	 * This will have the activity hash of the last completed story/campaign mission, in case you care about that.
	 */
	lastCompletedStoryHash: number;
}
