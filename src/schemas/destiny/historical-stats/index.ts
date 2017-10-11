import {UserInfoCard} from '../../user';
import {DestinyActivityModeType} from './definitions';

import * as Definitions from './definitions';
export {Definitions};

export interface DestinyPostGameCarnageReportData {
	/**
	 * Date and time for the activity.
	 */
	period: string;
	/**
	 * Details about the activity.
	 */
	activityDetails: DestinyHistoricalStatsActivity;
	/**
	 * Collection of players and their data for this activity.
	 */
	entries: DestinyPostGameCarnageReportEntry[];
	/**
	 * Collection of stats for the player in this activity.
	 */
	teams: DestinyPostGameCarnageReportTeamEntry[];
}

export interface DestinyHistoricalStatsActivity {
	/**
	 * Hash ID that can be looked up in the DestinyActivityTable.
	 */
	referenceId: number;
	directorActivityHash: number;
	/**
	 * This value can be used to get additional data about this activity such as who else was playing.
	 */
	instanceId: string;
	/**
	 * Indicates the game mode of the activity.
	 */
	mode: DestinyActivityModeType;
	modes: DestinyActivityModeType[];
	/**
	 * Whether or not the match was a private match.
	 */
	isPrivate: boolean;
}

export interface DestinyPostGameCarnageReportEntry {
	/**
	 * Standing of the player
	 */
	standing: number;
	/**
	 * Score of the player if available
	 */
	score: DestinyHistoricalStatsValue;
	/**
	 * Identity details of the player
	 */
	player: DestinyPlayer;
	/**
	 * ID of the player's character used in the activity.
	 */
	characterId: string;
	/**
	 * Collection of stats for the player in this activity.
	 */
	values: {[field: string]: DestinyHistoricalStatsValue};
	/**
	 * Extended data extracted from the activity blob.
	 */
	extended: DestinyPostGameCarnageReportExtendedData;
}

export interface DestinyHistoricalStatsValue {
	/**
	 * Unique ID for this stat
	 */
	statId: string;
	/**
	 * Basic stat value.
	 */
	basic: DestinyHistoricalStatsValuePair;
	/**
	 * Per game average for the statistic, if applicable
	 */
	pga: DestinyHistoricalStatsValuePair;
	/**
	 * Weighted value of the stat if a weight greater than 1 has been assigned.
	 */
	weighted: DestinyHistoricalStatsValuePair;
}

export interface DestinyHistoricalStatsValuePair {
	/**
	 * Raw value of the statistic
	 */
	value: number;
	/**
	 * Localized formated version of the value.
	 */
	displayValue: string;
}

export interface DestinyPlayer {
	/**
	 * Details about the player as they are known in game (platform display name, Destiny emblem)
	 */
	destinyUserInfo: UserInfoCard;
	/**
	 * Class of the character if applicable and available.
	 */
	characterClass: string;
	/**
	 * Level of the character if available. Zero if it is not available.
	 */
	characterLevel: number;
	/**
	 * Light Level of the character if available. Zero if it is not available.
	 */
	lightLevel: number;
	/**
	 * Details about the player as they are known on BungieNet. This will be undefined if the player has marked their credential private, or does not have a BungieNet account.
	 */
	bungieNetUserInfo: UserInfoCard;
	/**
	 * Current clan name for the player. This value may be null or an empty string if the user does not have a clan.
	 */
	clanName: string;
	/**
	 * Current clan tag for the player. This value may be null or an empty string if the user does not have a clan.
	 */
	clanTag: string;
}

export interface DestinyPostGameCarnageReportExtendedData {
	/**
	 * List of weapons and their perspective values.
	 */
	weapons: DestinyHistoricalWeaponStats[];
	/**
	 * Collection of stats for the player in this activity.
	 */
	values: {[field: string]: DestinyHistoricalStatsValue};
}

export interface DestinyHistoricalWeaponStats {
	/**
	 * The hash ID of the item definition that describes the weapon.
	 */
	referenceId: number;
	/**
	 * Collection of stats for the period.
	 */
	values: {[field: string]: DestinyHistoricalStatsValue};
}

export interface DestinyPostGameCarnageReportTeamEntry {
	/**
	 * Integer ID for the team.
	 */
	teamId: number;
	/**
	 * Team's standing relative to other teams.
	 */
	standing: DestinyHistoricalStatsValue;
	/**
	 * Score earned by the team
	 */
	score: DestinyHistoricalStatsValue;
	/**
	 * Alpha or Bravo
	 */
	teamName: string;
}

export interface DestinyLeaderboard {
	statId: string;
	entries: DestinyLeaderboardEntry[];
}

export interface DestinyLeaderboardEntry {
	/**
	 * Where this player ranks on the leaderboard. A value of 1 is the top rank.
	 */
	rank: number;
	/**
	 * Identity details of the player
	 */
	player: DestinyPlayer;
	/**
	 * ID of the player's best character for the reported stat.
	 */
	characterId: string;
	/**
	 * Value of the stat for this player
	 */
	value: DestinyHistoricalStatsValue;
}

export interface DestinyLeaderboardResults {
	/**
	 * Indicate the membership ID of the account that is the focal point of the provided leaderboards.
	 */
	focusMembershipId?: string;
	/**
	 * Indicate the character ID of the character that is the focal point of the provided leaderboards. May be null, in which case any character from the focus membership can appear in the provided leaderboards.
	 */
	focusCharacterId?: string;
}

export interface DestinyClanAggregateStat {
	/**
	 * The id of the mode of stats (allPvp, allPvE, etc)
	 */
	mode: DestinyActivityModeType;
	/**
	 * The id of the stat
	 */
	statId: string;
	/**
	 * Value of the stat for this player
	 */
	value: DestinyHistoricalStatsValue;
}

export interface DestinyHistoricalStatsByPeriod {
	allTime: {[field: string]: DestinyHistoricalStatsValue};
	allTimeTier1: {[field: string]: DestinyHistoricalStatsValue};
	allTimeTier2: {[field: string]: DestinyHistoricalStatsValue};
	allTimeTier3: {[field: string]: DestinyHistoricalStatsValue};
	daily: DestinyHistoricalStatsPeriodGroup[];
	monthly: DestinyHistoricalStatsPeriodGroup[];
}

export interface DestinyHistoricalStatsPeriodGroup {
	/**
	 * Period for the group. If the stat periodType is day, then this will have a specific day. If the type is monthly, then this value will be the first day of the applicable month. This value is not set when the periodType is 'all time'.
	 */
	period: string;
	/**
	 * If the period group is for a specific activity, this property will be set.
	 */
	activityDetails: DestinyHistoricalStatsActivity;
	/**
	 * Collection of stats for the period.
	 */
	values: {[field: string]: DestinyHistoricalStatsValue};
}

export class DestinyHistoricalStatsResults {
	[field: string]: DestinyHistoricalStatsByPeriod;
}

export interface DestinyHistoricalStatsAccountResult {
	mergedDeletedCharacters: DestinyHistoricalStatsWithMerged;
	mergedAllCharacters: DestinyHistoricalStatsWithMerged;
	characters: DestinyHistoricalStatsPerCharacter[];
}

export interface DestinyHistoricalStatsWithMerged {
	results: {[field: string]: DestinyHistoricalStatsByPeriod};
	merged: DestinyHistoricalStatsByPeriod;
}

export interface DestinyHistoricalStatsPerCharacter {
	characterId: string;
	deleted: boolean;
	results: {[field: string]: DestinyHistoricalStatsByPeriod};
	merged: DestinyHistoricalStatsByPeriod;
}

export interface DestinyActivityHistoryResults {
	/**
	 * List of activities, the most recent activity first.
	 */
	activities: DestinyHistoricalStatsPeriodGroup[];
}

export interface DestinyHistoricalWeaponStatsData {
	/**
	 * List of weapons and their perspective values.
	 */
	weapons: DestinyHistoricalWeaponStats[];
}

export interface DestinyAggregateActivityResults {
	/**
	 * List of all activities the player has participated in.
	 */
	activities: DestinyAggregateActivityStats[];
}

export interface DestinyAggregateActivityStats {
	/**
	 * Hash ID that can be looked up in the DestinyActivityTable.
	 */
	activityHash: number;
	/**
	 * Collection of stats for the player in this activity.
	 */
	values: {[field: string]: DestinyHistoricalStatsValue};
}
