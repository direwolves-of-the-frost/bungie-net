import {Module} from '../module';
import {DictionaryOfuint32AndDestinyPublicMilestone, IEnumerableOfUserInfoCard, Int32, ListOfDestinyClanAggregateStat, ListOfDestinyVendorResponse, ReadOnlyDictionaryOfstringAndDestinyHistoricalStatsDefinition} from '../responses';
import {DestinyEquipItemResults} from '../responses/destiny';
import {DestinyManifest} from '../responses/destiny/config';
import {DestinyDefinition, DestinyEntitySearchResult} from '../responses/destiny/definitions';
import {DestinyActivityHistoryResults, DestinyAggregateActivityResults, DestinyHistoricalStatsAccountResult, DestinyHistoricalStatsResults, DestinyHistoricalWeaponStatsData, DestinyLeaderboardResults, DestinyPostGameCarnageReportData} from '../responses/destiny/historical-stats';
import {DestinyMilestone, DestinyMilestoneContent} from '../responses/destiny/milestones';
import {DestinyCharacterResponse, DestinyItemResponse, DestinyProfileResponse, DestinyVendorResponse} from '../responses/destiny/responses';
import {BungieMembershipType} from '../schemas';
import {DestinyComponentType} from '../schemas/destiny';
import {DestinyActivityModeType, DestinyStatsGroupType, PeriodType} from '../schemas/destiny/historical-stats/definitions';

export class Destiny2 extends Module {
	/**
	 * Returns the current version of the manifest as a json object.
	 *
	 * @returns {Promise<DestinyManifest>}
	 * @memberof Destiny2
	 */
	public GetDestinyManifest(): Promise<DestinyManifest> {
		return this.client.get(`Destiny2/Manifest`);
	}

	/**
	 * Returns the static definition of an entity of the given Type and hash identifier. Examine the API Documentation for the Type Names of entities that have their own definitions. Note that the return type will always *inherit from* DestinyDefinition, but the specific type returned will be the requested entity type if it can be found. Please don't use this as a chatty alternative to the Manifest database if you require large sets of data, but for simple and one-off accesses this should be handy.
	 *
	 * @param {string} entityType
	 * @param {number} hashIdentifier
	 * @returns {Promise<DestinyDefinition>}
	 * @memberof Destiny2
	 */
	public GetDestinyEntityDefinition(entityType: string, hashIdentifier: number): Promise<DestinyDefinition> {
		return this.client.get(`Destiny2/Manifest/${entityType}/${hashIdentifier}`);
	}

	/**
	 * Returns a list of Destiny memberships given a full Gamertag or PSN ID.
	 *
	 * @param {string} displayName
	 * @param {BungieMembershipType} membershipType
	 * @returns {Promise<IEnumerableOfUserInfoCard>}
	 * @memberof Destiny2
	 */
	public SearchDestinyPlayer(displayName: string, membershipType: BungieMembershipType): Promise<IEnumerableOfUserInfoCard> {
		return this.client.get(`Destiny2/SearchDestinyPlayer/${membershipType}/${displayName}`);
	}

	/**
	 * Returns Destiny Profile information for the supplied membership.
	 *
	 * @param {string} destinyMembershipId
	 * @param {BungieMembershipType} membershipType
	 * @param {DestinyComponentType[]} [components]
	 * @returns {Promise<DestinyProfileResponse>}
	 * @memberof Destiny2
	 */
	public GetProfile(destinyMembershipId: string, membershipType: BungieMembershipType, components?: DestinyComponentType[]): Promise<DestinyProfileResponse> {
		return this.client.get(`Destiny2/${membershipType}/Profile/${destinyMembershipId}`, { components });
	}

	/**
	 * Returns character information for the supplied character.
	 *
	 * @param {string} characterId
	 * @param {string} destinyMembershipId
	 * @param {BungieMembershipType} membershipType
	 * @param {DestinyComponentType[]} [components]
	 * @returns {Promise<DestinyCharacterResponse>}
	 * @memberof Destiny2
	 */
	public GetCharacter(characterId: string, destinyMembershipId: string, membershipType: BungieMembershipType, components?: DestinyComponentType[]): Promise<DestinyCharacterResponse> {
		return this.client.get(`Destiny2/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}`, { components });
	}

	/**
	 * Returns information on the weekly clan rewards and if the clan has earned them or not. Note that this will always report rewards as not redeemed.
	 *
	 * @param {string} groupId
	 * @returns {Promise<DestinyMilestone>}
	 * @memberof Destiny2
	 */
	public GetClanWeeklyRewardState(groupId: string): Promise<DestinyMilestone> {
		return this.client.get(`Destiny2/Clan/${groupId}/WeeklyRewardState`);
	}

	/**
	 * Retrieve the details of an instanced Destiny Item. An instanced Destiny item is one with an ItemInstanceId. Non-instanced items, such as materials, have no useful instance-specific details and thus are not queryable here.
	 *
	 * @param {string} destinyMembershipId
	 * @param {string} itemInstanceId
	 * @param {BungieMembershipType} membershipType
	 * @param {DestinyComponentType[]} [components]
	 * @returns {Promise<DestinyItemResponse>}
	 * @memberof Destiny2
	 */
	public GetItem(destinyMembershipId: string, itemInstanceId: string, membershipType: BungieMembershipType, components?: DestinyComponentType[]): Promise<DestinyItemResponse> {
		return this.client.get(`Destiny2/${membershipType}/Profile/${destinyMembershipId}/Item/${itemInstanceId}`, { components });
	}

	/**
	 * Get currently available vendors. PREVIEW: This service is not yet active, but we are returning the planned schema of the endpoint for review, comment, and preparation for its eventual implementation.
	 *
	 * @param {string} characterId
	 * @param {string} destinyMembershipId
	 * @param {BungieMembershipType} membershipType
	 * @param {DestinyComponentType[]} [components]
	 * @returns {Promise<ListOfDestinyVendorResponse>}
	 * @memberof Destiny2
	 */
	public GetVendors(characterId: string, destinyMembershipId: string, membershipType: BungieMembershipType, components?: DestinyComponentType[]): Promise<ListOfDestinyVendorResponse> {
		return this.client.get(`Destiny2/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/Vendors`, { components });
	}

	/**
	 * Get the details of a specific Vendor. PREVIEW: This service is not yet active, but we are returning the planned schema of the endpoint for review, comment, and preparation for its eventual implementation.
	 *
	 * @param {string} characterId
	 * @param {string} destinyMembershipId
	 * @param {BungieMembershipType} membershipType
	 * @param {number} vendorHash
	 * @param {DestinyComponentType[]} [components]
	 * @returns {Promise<DestinyVendorResponse>}
	 * @memberof Destiny2
	 */
	public GetVendor(characterId: string, destinyMembershipId: string, membershipType: BungieMembershipType, vendorHash: number, components?: DestinyComponentType[]): Promise<DestinyVendorResponse> {
		return this.client.get(`Destiny2/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/Vendors/${vendorHash}`, { components });
	}

	/**
	 * Transfer an item to/from your vault. You must have a valid Destiny account. You must also pass BOTH a reference AND an instance ID if it's an instanced item. itshappening.gif
	 *
	 * @returns {Promise<Int32>}
	 * @memberof Destiny2
	 */
	public TransferItem(): Promise<Int32> {
		return this.client.post(`Destiny2/Actions/Items/TransferItem`);
	}

	/**
	 * Equip an item. You must have a valid Destiny Account, and either be in a social space, in orbit, or offline.
	 *
	 * @returns {Promise<Int32>}
	 * @memberof Destiny2
	 */
	public EquipItem(): Promise<Int32> {
		return this.client.post(`Destiny2/Actions/Items/EquipItem`);
	}

	/**
	 * Equip a list of items by itemInstanceIds. You must have a valid Destiny Account, and either be in a social space, in orbit, or offline. Any items not found on your character will be ignored.
	 *
	 * @returns {Promise<DestinyEquipItemResults>}
	 * @memberof Destiny2
	 */
	public EquipItems(): Promise<DestinyEquipItemResults> {
		return this.client.post(`Destiny2/Actions/Items/EquipItems`);
	}

	/**
	 * Set the Lock State for an instanced item. You must have a valid Destiny Account.
	 *
	 * @returns {Promise<Int32>}
	 * @memberof Destiny2
	 */
	public SetItemLockState(): Promise<Int32> {
		return this.client.post(`Destiny2/Actions/Items/SetLockState`);
	}

	/**
	 * Insert a plug into a socketed item. I know how it sounds, but I assure you it's much more G-rated than you might be guessing. We haven't decided yet whether this will be able to insert plugs that have side effects, but if we do it will require special scope permission for an application attempting to do so. You must have a valid Destiny Account, and either be in a social space, in orbit, or offline. PREVIEW: This service is not yet active, but we are returning the planned schema of the endpoint for review, comment, and preparation for its eventual implementation.
	 *
	 * @returns {Promise<Int32>}
	 * @memberof Destiny2
	 */
	public InsertSocketPlug(): Promise<Int32> {
		return this.client.post(`Destiny2/Actions/Items/InsertSocketPlug`);
	}

	/**
	 * Activate a Talent Node. Chill out, everyone: we haven't decided yet whether this will be able to activate nodes with costs, but if we do it will require special scope permission for an application attempting to do so. You must have a valid Destiny Account, and either be in a social space, in orbit, or offline. PREVIEW: This service is not actually implemented yet, but we are returning the planned schema of the endpoint for review, comment, and preparation for its eventual implementation.
	 *
	 * @returns {Promise<Int32>}
	 * @memberof Destiny2
	 */
	public ActivateTalentNode(): Promise<Int32> {
		return this.client.post(`Destiny2/Actions/Items/ActivateTalentNode`);
	}

	/**
	 * Gets the available post game carnage report for the activity ID.
	 *
	 * @param {string} activityId
	 * @returns {Promise<DestinyPostGameCarnageReportData>}
	 * @memberof Destiny2
	 */
	public GetPostGameCarnageReport(activityId: string): Promise<DestinyPostGameCarnageReportData> {
		return this.client.get(`Destiny2/Stats/PostGameCarnageReport/${activityId}`);
	}

	/**
	 * Gets historical stats definitions.
	 *
	 * @returns {Promise<ReadOnlyDictionaryOfstringAndDestinyHistoricalStatsDefinition>}
	 * @memberof Destiny2
	 */
	public GetHistoricalStatsDefinition(): Promise<ReadOnlyDictionaryOfstringAndDestinyHistoricalStatsDefinition> {
		return this.client.get(`Destiny2/Stats/Definition`);
	}

	/**
	 * Gets leaderboards with the signed in user's friends and the supplied destinyMembershipId as the focus. PREVIEW: This endpoint is still in beta, and may experience rough edges. The schema is in final form, but there may be bugs that prevent desirable operation.
	 *
	 * @param {string} groupId
	 * @param {number} [maxtop]
	 * @param {string} [modes]
	 * @param {string} [statid]
	 * @returns {Promise<DestinyLeaderboardResults>}
	 * @memberof Destiny2
	 */
	public GetClanLeaderboards(groupId: string, maxtop?: number, modes?: string, statid?: string): Promise<DestinyLeaderboardResults> {
		return this.client.get(`Destiny2/Stats/Leaderboards/Clans/${groupId}`, { maxtop, modes, statid });
	}

	/**
	 * Gets aggregated stats for a clan using the same categories as the clan leaderboards. PREVIEW: This endpoint is still in beta, and may experience rough edges. The schema is in final form, but there may be bugs that prevent desirable operation.
	 *
	 * @param {string} groupId
	 * @param {string} [modes]
	 * @returns {Promise<ListOfDestinyClanAggregateStat>}
	 * @memberof Destiny2
	 */
	public GetClanAggregateStats(groupId: string, modes?: string): Promise<ListOfDestinyClanAggregateStat> {
		return this.client.get(`Destiny2/Stats/AggregateClanStats/${groupId}`, { modes });
	}

	/**
	 * Gets leaderboards with the signed in user's friends and the supplied destinyMembershipId as the focus. PREVIEW: This endpoint has not yet been implemented. It is being returned for a preview of future functionality, and for public comment/suggestion/preparation.
	 *
	 * @param {string} destinyMembershipId
	 * @param {BungieMembershipType} membershipType
	 * @param {number} [maxtop]
	 * @param {string} [modes]
	 * @param {string} [statid]
	 * @returns {Promise<DestinyLeaderboardResults>}
	 * @memberof Destiny2
	 */
	public GetLeaderboards(destinyMembershipId: string, membershipType: BungieMembershipType, maxtop?: number, modes?: string, statid?: string): Promise<DestinyLeaderboardResults> {
		return this.client.get(`Destiny2/${membershipType}/Account/${destinyMembershipId}/Stats/Leaderboards`, { maxtop, modes, statid });
	}

	/**
	 * Gets leaderboards with the signed in user's friends and the supplied destinyMembershipId as the focus. PREVIEW: This endpoint is still in beta, and may experience rough edges. The schema is in final form, but there may be bugs that prevent desirable operation.
	 *
	 * @param {string} characterId
	 * @param {string} destinyMembershipId
	 * @param {BungieMembershipType} membershipType
	 * @param {number} [maxtop]
	 * @param {string} [modes]
	 * @param {string} [statid]
	 * @returns {Promise<DestinyLeaderboardResults>}
	 * @memberof Destiny2
	 */
	public GetLeaderboardsForCharacter(characterId: string, destinyMembershipId: string, membershipType: BungieMembershipType, maxtop?: number, modes?: string, statid?: string): Promise<DestinyLeaderboardResults> {
		return this.client.get(`Destiny2/Stats/Leaderboards/${membershipType}/${destinyMembershipId}/${characterId}`, { maxtop, modes, statid });
	}

	/**
	 * Gets a page list of Destiny items.
	 *
	 * @param {string} searchTerm
	 * @param {string} type
	 * @param {number} [page]
	 * @returns {Promise<DestinyEntitySearchResult>}
	 * @memberof Destiny2
	 */
	public SearchDestinyEntities(searchTerm: string, type: string, page?: number): Promise<DestinyEntitySearchResult> {
		return this.client.get(`Destiny2/Armory/Search/${type}/${searchTerm}`, { page });
	}

	/**
	 * Gets historical stats for indicated character. PREVIEW: This endpoint is still in beta, and may experience rough edges. The schema is in final form, but there may be bugs that prevent desirable operation.
	 *
	 * @param {string} characterId
	 * @param {string} destinyMembershipId
	 * @param {BungieMembershipType} membershipType
	 * @param {string} [dayend]
	 * @param {string} [daystart]
	 * @param {DestinyStatsGroupType[]} [groups]
	 * @param {DestinyActivityModeType[]} [modes]
	 * @param {PeriodType} [periodType]
	 * @returns {Promise<DestinyHistoricalStatsResults>}
	 * @memberof Destiny2
	 */
	public GetHistoricalStats(characterId: string, destinyMembershipId: string, membershipType: BungieMembershipType, dayend?: string, daystart?: string, groups?: DestinyStatsGroupType[], modes?: DestinyActivityModeType[], periodType?: PeriodType): Promise<DestinyHistoricalStatsResults> {
		return this.client.get(`Destiny2/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats`, { dayend, daystart, groups, modes, periodType });
	}

	/**
	 * Gets aggregate historical stats organized around each character for a given account. PREVIEW: This endpoint is still in beta, and may experience rough edges. The schema is in final form, but there may be bugs that prevent desirable operation.
	 *
	 * @param {string} destinyMembershipId
	 * @param {BungieMembershipType} membershipType
	 * @param {DestinyStatsGroupType[]} [groups]
	 * @returns {Promise<DestinyHistoricalStatsAccountResult>}
	 * @memberof Destiny2
	 */
	public GetHistoricalStatsForAccount(destinyMembershipId: string, membershipType: BungieMembershipType, groups?: DestinyStatsGroupType[]): Promise<DestinyHistoricalStatsAccountResult> {
		return this.client.get(`Destiny2/${membershipType}/Account/${destinyMembershipId}/Stats`, { groups });
	}

	/**
	 * Gets activity history stats for indicated character. PREVIEW: This endpoint is still in beta, and may experience rough edges. The schema is in final form, but there may be bugs that prevent desirable operation.
	 *
	 * @param {string} characterId
	 * @param {string} destinyMembershipId
	 * @param {BungieMembershipType} membershipType
	 * @param {number} [count]
	 * @param {DestinyActivityModeType} [mode]
	 * @param {number} [page]
	 * @returns {Promise<DestinyActivityHistoryResults>}
	 * @memberof Destiny2
	 */
	public GetActivityHistory(characterId: string, destinyMembershipId: string, membershipType: BungieMembershipType, count?: number, mode?: DestinyActivityModeType, page?: number): Promise<DestinyActivityHistoryResults> {
		return this.client.get(`Destiny2/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/Activities`, { count, mode, page });
	}

	/**
	 * Gets details about unique weapon usage, including all exotic weapons. PREVIEW: This endpoint is still in beta, and may experience rough edges. The schema is in final form, but there may be bugs that prevent desirable operation.
	 *
	 * @param {string} characterId
	 * @param {string} destinyMembershipId
	 * @param {BungieMembershipType} membershipType
	 * @returns {Promise<DestinyHistoricalWeaponStatsData>}
	 * @memberof Destiny2
	 */
	public GetUniqueWeaponHistory(characterId: string, destinyMembershipId: string, membershipType: BungieMembershipType): Promise<DestinyHistoricalWeaponStatsData> {
		return this.client.get(`Destiny2/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/UniqueWeapons`);
	}

	/**
	 * Gets all activities the character has participated in together with aggregate statistics for those activities. PREVIEW: This endpoint is still in beta, and may experience rough edges. The schema is in final form, but there may be bugs that prevent desirable operation.
	 *
	 * @param {string} characterId
	 * @param {string} destinyMembershipId
	 * @param {BungieMembershipType} membershipType
	 * @returns {Promise<DestinyAggregateActivityResults>}
	 * @memberof Destiny2
	 */
	public GetDestinyAggregateActivityStats(characterId: string, destinyMembershipId: string, membershipType: BungieMembershipType): Promise<DestinyAggregateActivityResults> {
		return this.client.get(`Destiny2/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/AggregateActivityStats`);
	}

	/**
	 * Gets custom localized content for the milestone of the given hash, if it exists.
	 *
	 * @param {number} milestoneHash
	 * @returns {Promise<DestinyMilestoneContent>}
	 * @memberof Destiny2
	 */
	public GetPublicMilestoneContent(milestoneHash: number): Promise<DestinyMilestoneContent> {
		return this.client.get(`Destiny2/Milestones/${milestoneHash}/Content`);
	}

	/**
	 * Gets public information about currently available Milestones.
	 *
	 * @returns {Promise<DictionaryOfuint32AndDestinyPublicMilestone>}
	 * @memberof Destiny2
	 */
	public GetPublicMilestones(): Promise<DictionaryOfuint32AndDestinyPublicMilestone> {
		return this.client.get(`Destiny2/Milestones`);
	}
}
