export enum DestinyActivityModeType {
	None = 0,
	Story = 2,
	Strike = 3,
	Raid = 4,
	AllPvP = 5,
	Patrol = 6,
	AllPvE = 7,
	Reserved9 = 9,
	Control = 10,
	Reserved11 = 11,
	Clash = 12,
	Reserved13 = 13,
	Reserved15 = 15,
	Nightfall = 16,
	HeroicNightfall = 17,
	AllStrikes = 18,
	IronBanner = 19,
	Reserved20 = 20,
	Reserved21 = 21,
	Reserved22 = 22,
	Reserved24 = 24,
	Reserved25 = 25,
	Reserved26 = 26,
	Reserved27 = 27,
	Reserved28 = 28,
	Reserved29 = 29,
	Reserved30 = 30,
	Supremacy = 31,
	Reserved32 = 32,
	Survival = 37,
	Countdown = 38,
	TrialsOfTheNine = 39,
	Social = 40,
}

export interface DestinyHistoricalStatsDefinition {
	/**
	 * Unique programmer friendly ID for this stat
	 */
	statId: string;
	/**
	 * Statistic group
	 */
	group: DestinyStatsGroupType;
	/**
	 * Time periods the statistic covers
	 */
	periodTypes: PeriodType[];
	/**
	 * Game modes where this statistic can be reported.
	 */
	modes: DestinyActivityModeType[];
	/**
	 * Category for the stat.
	 */
	category: DestinyStatsCategoryType;
	/**
	 * Display name
	 */
	statName: string;
	/**
	 * Description of a stat if applicable.
	 */
	statDescription: string;
	/**
	 * Unit, if any, for the statistic
	 */
	unitType: UnitType;
	/**
	 * Optional URI to an icon for the statistic
	 */
	iconImage: string;
	/**
	 * Optional icon for the statistic
	 */
	mergeMethod?: number;
	/**
	 * Localized Unit Name for the stat.
	 */
	unitLabel: string;
	/**
	 * Weight assigned to this stat indicating its relative impressiveness.
	 */
	weight: number;
	/**
	 * The tier associated with this medal - be it implicitly or explicitly.
	 */
	medalTierHash?: number;
}

export enum DestinyStatsGroupType {
	None = 0,
	General = 1,
	Weapons = 2,
	Medals = 3,
	ReservedGroups = 100,
	Leaderboard = 101,
	Activity = 102,
	UniqueWeapon = 103,
	Internal = 104,
}

export enum DestinyStatsCategoryType {
	None = 0,
	Kills = 1,
	Assists = 2,
	Deaths = 3,
	Criticals = 4,
	KDa = 5,
	KD = 6,
	Score = 7,
	Entered = 8,
	TimePlayed = 9,
	MedalWins = 10,
	MedalGame = 11,
	MedalSpecialKills = 12,
	MedalSprees = 13,
	MedalMultiKills = 14,
	MedalAbilities = 15,
}

export enum UnitType {
	None = 0,
	Count = 1,
	PerGame = 2,
	Seconds = 3,
	Points = 4,
	Team = 5,
	Distance = 6,
	Percent = 7,
	Ratio = 8,
	Boolean = 9,
	WeaponType = 10,
	Standing = 11,
	Milliseconds = 12,
}

export enum DestinyStatsMergeMethod {
	Add = 0,
	Min = 1,
	Max = 2,
}

export enum PeriodType {
	None = 0,
	Daily = 1,
	AllTime = 2,
	Activity = 3,
}
