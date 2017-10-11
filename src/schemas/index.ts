import {CommunityLiveStatus} from './community';
import {ComponentPrivacySetting} from './components';
import {DestinyItemPlugComponent} from './destiny/components/items';
import {DestinyKiosksComponent} from './destiny/components/kiosks';
import {DestinyEntitySearchResultItem} from './destiny/definitions';
import {DestinyCharacterActivitiesComponent, DestinyCharacterComponent, DestinyCharacterProgressionComponent, DestinyCharacterRenderComponent} from './destiny/entities/characters';
import {DestinyInventoryComponent} from './destiny/entities/inventory';
import {DestinyItemComponent, DestinyItemInstanceComponent, DestinyItemObjectivesComponent, DestinyItemPerksComponent, DestinyItemRenderComponent, DestinyItemSocketsComponent, DestinyItemStatsComponent, DestinyItemTalentGridComponent} from './destiny/entities/items';
import {DestinyProfileComponent, DestinyVendorReceiptsComponent} from './destiny/entities/profiles';
import {DestinyVendorCategoriesComponent, DestinyVendorComponent, DestinyVendorSaleItemComponent} from './destiny/entities/vendors';
import {PostResponse} from './forum';
import {GroupBan, GroupMember, GroupMemberApplication, GroupMembership, GroupPotentialMembership, GroupV2Card} from './groups-v2';
import {PagedQuery} from './queries';
import {TrendingEntry} from './trending';

/**
 * The types of membership the Accounts system supports. This is the external facing enum used in place of the internal-only Bungie.SharedDefinitions.MembershipType.
 */
export enum BungieMembershipType {
	None = 0,
	TigerXbox = 1,
	TigerPsn = 2,
	TigerBlizzard = 4,
	TigerDemon = 10,
	BungieNext = 254,
	All = -1,
}

export interface SearchResultOfPostResponse {
	results: PostResponse[];
	totalResults: number;
	hasMore: boolean;
	query: PagedQuery;
	replacementContinuationToken: string;
	/**
	 * If useTotalResults is true, then totalResults represents an accurate count.
	 * If False, it does not, and may be estimated/only the size of the current page.
	 * Either way, you should probably always only trust hasMore.
	 * This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one.
	 */
	useTotalResults: boolean;
}

export interface SearchResultOfGroupV2Card {
	results: GroupV2Card[];
	totalResults: number;
	hasMore: boolean;
	query: PagedQuery;
	replacementContinuationToken: string;
	/**
	 * If useTotalResults is true, then totalResults represents an accurate count.
	 * If False, it does not, and may be estimated/only the size of the current page.
	 * Either way, you should probably always only trust hasMore.
	 * This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one.
	 */
	useTotalResults: boolean;
}

export interface SearchResultOfGroupMember {
	results: GroupMember[];
	totalResults: number;
	hasMore: boolean;
	query: PagedQuery;
	replacementContinuationToken: string;
	/**
	 * If useTotalResults is true, then totalResults represents an accurate count.
	 * If False, it does not, and may be estimated/only the size of the current page.
	 * Either way, you should probably always only trust hasMore.
	 * This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one.
	 */
	useTotalResults: boolean;
}

export interface SearchResultOfGroupBan {
	results: GroupBan[];
	totalResults: number;
	hasMore: boolean;
	query: PagedQuery;
	replacementContinuationToken: string;
	/**
	 * If useTotalResults is true, then totalResults represents an accurate count.
	 * If False, it does not, and may be estimated/only the size of the current page.
	 * Either way, you should probably always only trust hasMore.
	 * This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one.
	 */
	useTotalResults: boolean;
}

export interface SearchResultOfGroupMemberApplication {
	results: GroupMemberApplication[];
	totalResults: number;
	hasMore: boolean;
	query: PagedQuery;
	replacementContinuationToken: string;
	/**
	 * If useTotalResults is true, then totalResults represents an accurate count.
	 * If False, it does not, and may be estimated/only the size of the current page.
	 * Either way, you should probably always only trust hasMore.
	 * This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one.
	 */
	useTotalResults: boolean;
}

export interface SearchResultOfGroupMembership {
	results: GroupMembership[];
	totalResults: number;
	hasMore: boolean;
	query: PagedQuery;
	replacementContinuationToken: string;
	/**
	 * If useTotalResults is true, then totalResults represents an accurate count.
	 * If False, it does not, and may be estimated/only the size of the current page.
	 * Either way, you should probably always only trust hasMore.
	 * This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one.
	 */
	useTotalResults: boolean;
}

export interface SearchResultOfGroupPotentialMembership {
	results: GroupPotentialMembership[];
	totalResults: number;
	hasMore: boolean;
	query: PagedQuery;
	replacementContinuationToken: string;
	/**
	 * If useTotalResults is true, then totalResults represents an accurate count.
	 * If False, it does not, and may be estimated/only the size of the current page.
	 * Either way, you should probably always only trust hasMore.
	 * This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one.
	 */
	useTotalResults: boolean;
}

export interface SingleComponentResponseOfDestinyVendorReceiptsComponent {
	data: DestinyVendorReceiptsComponent;
	privacy: ComponentPrivacySetting;
}

export interface SingleComponentResponseOfDestinyInventoryComponent {
	data: DestinyInventoryComponent;
	privacy: ComponentPrivacySetting;
}

export interface SingleComponentResponseOfDestinyProfileComponent {
	data: DestinyProfileComponent;
	privacy: ComponentPrivacySetting;
}

export interface SingleComponentResponseOfDestinyKiosksComponent {
	data: DestinyKiosksComponent;
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfint64AndDestinyCharacterComponent {
	data: {[field: string]: DestinyCharacterComponent};
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfint64AndDestinyInventoryComponent {
	data: {[field: string]: DestinyInventoryComponent};
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfint64AndDestinyCharacterProgressionComponent {
	data: {[field: string]: DestinyCharacterProgressionComponent};
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfint64AndDestinyCharacterRenderComponent {
	data: {[field: string]: DestinyCharacterRenderComponent};
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfint64AndDestinyCharacterActivitiesComponent {
	data: {[field: string]: DestinyCharacterActivitiesComponent};
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfint64AndDestinyKiosksComponent {
	data: {[field: string]: DestinyKiosksComponent};
	privacy: ComponentPrivacySetting;
}

export interface DestinyItemComponentSetOfint64 {
	instances: DictionaryComponentResponseOfint64AndDestinyItemInstanceComponent;
	objectives: DictionaryComponentResponseOfint64AndDestinyItemObjectivesComponent;
	perks: DictionaryComponentResponseOfint64AndDestinyItemPerksComponent;
	renderData: DictionaryComponentResponseOfint64AndDestinyItemRenderComponent;
	stats: DictionaryComponentResponseOfint64AndDestinyItemStatsComponent;
	sockets: DictionaryComponentResponseOfint64AndDestinyItemSocketsComponent;
	talentGrids: DictionaryComponentResponseOfint64AndDestinyItemTalentGridComponent;
	plugStates: DictionaryComponentResponseOfuint32AndDestinyItemPlugComponent;
}

export interface DictionaryComponentResponseOfint64AndDestinyItemInstanceComponent {
	data: {[field: string]: DestinyItemInstanceComponent};
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfint64AndDestinyItemObjectivesComponent {
	data: {[field: string]: DestinyItemObjectivesComponent};
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfint64AndDestinyItemPerksComponent {
	data: {[field: string]: DestinyItemPerksComponent};
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfint64AndDestinyItemRenderComponent {
	data: {[field: string]: DestinyItemRenderComponent};
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfint64AndDestinyItemStatsComponent {
	data: {[field: string]: DestinyItemStatsComponent};
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfint64AndDestinyItemSocketsComponent {
	data: {[field: string]: DestinyItemSocketsComponent};
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfint64AndDestinyItemTalentGridComponent {
	data: {[field: string]: DestinyItemTalentGridComponent};
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfuint32AndDestinyItemPlugComponent {
	data: {[field: number]: DestinyItemPlugComponent};
	privacy: ComponentPrivacySetting;
}

export interface SingleComponentResponseOfDestinyCharacterComponent {
	data: DestinyCharacterComponent;
	privacy: ComponentPrivacySetting;
}

export interface SingleComponentResponseOfDestinyCharacterProgressionComponent {
	data: DestinyCharacterProgressionComponent;
	privacy: ComponentPrivacySetting;
}

export interface SingleComponentResponseOfDestinyCharacterRenderComponent {
	data: DestinyCharacterRenderComponent;
	privacy: ComponentPrivacySetting;
}

export interface SingleComponentResponseOfDestinyCharacterActivitiesComponent {
	data: DestinyCharacterActivitiesComponent;
	privacy: ComponentPrivacySetting;
}

export interface SingleComponentResponseOfDestinyItemComponent {
	data: DestinyItemComponent;
	privacy: ComponentPrivacySetting;
}

export interface SingleComponentResponseOfDestinyItemInstanceComponent {
	data: DestinyItemInstanceComponent;
	privacy: ComponentPrivacySetting;
}

export interface SingleComponentResponseOfDestinyItemObjectivesComponent {
	data: DestinyItemObjectivesComponent;
	privacy: ComponentPrivacySetting;
}

export interface SingleComponentResponseOfDestinyItemPerksComponent {
	data: DestinyItemPerksComponent;
	privacy: ComponentPrivacySetting;
}

export interface SingleComponentResponseOfDestinyItemRenderComponent {
	data: DestinyItemRenderComponent;
	privacy: ComponentPrivacySetting;
}

export interface SingleComponentResponseOfDestinyItemStatsComponent {
	data: DestinyItemStatsComponent;
	privacy: ComponentPrivacySetting;
}

export interface SingleComponentResponseOfDestinyItemTalentGridComponent {
	data: DestinyItemTalentGridComponent;
	privacy: ComponentPrivacySetting;
}

export interface SingleComponentResponseOfDestinyItemSocketsComponent {
	data: DestinyItemSocketsComponent;
	privacy: ComponentPrivacySetting;
}

export interface SingleComponentResponseOfDestinyVendorComponent {
	data: DestinyVendorComponent;
	privacy: ComponentPrivacySetting;
}

export interface SingleComponentResponseOfDestinyVendorCategoriesComponent {
	data: DestinyVendorCategoriesComponent;
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfint32AndDestinyVendorSaleItemComponent {
	data: {[field: number]: DestinyVendorSaleItemComponent};
	privacy: ComponentPrivacySetting;
}

export interface DestinyItemComponentSetOfint32 {
	instances: DictionaryComponentResponseOfint32AndDestinyItemInstanceComponent;
	objectives: DictionaryComponentResponseOfint32AndDestinyItemObjectivesComponent;
	perks: DictionaryComponentResponseOfint32AndDestinyItemPerksComponent;
	renderData: DictionaryComponentResponseOfint32AndDestinyItemRenderComponent;
	stats: DictionaryComponentResponseOfint32AndDestinyItemStatsComponent;
	sockets: DictionaryComponentResponseOfint32AndDestinyItemSocketsComponent;
	talentGrids: DictionaryComponentResponseOfint32AndDestinyItemTalentGridComponent;
	plugStates: DictionaryComponentResponseOfuint32AndDestinyItemPlugComponent;
}

export interface DictionaryComponentResponseOfint32AndDestinyItemInstanceComponent {
	data: {[field: number]: DestinyItemInstanceComponent};
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfint32AndDestinyItemObjectivesComponent {
	data: {[field: number]: DestinyItemObjectivesComponent};
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfint32AndDestinyItemPerksComponent {
	data: {[field: number]: DestinyItemPerksComponent};
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfint32AndDestinyItemRenderComponent {
	data: {[field: number]: DestinyItemRenderComponent};
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfint32AndDestinyItemStatsComponent {
	data: {[field: number]: DestinyItemStatsComponent};
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfint32AndDestinyItemSocketsComponent {
	data: {[field: number]: DestinyItemSocketsComponent};
	privacy: ComponentPrivacySetting;
}

export interface DictionaryComponentResponseOfint32AndDestinyItemTalentGridComponent {
	data: {[field: number]: DestinyItemTalentGridComponent};
	privacy: ComponentPrivacySetting;
}

export interface SearchResultOfDestinyEntitySearchResultItem {
	results: DestinyEntitySearchResultItem[];
	totalResults: number;
	hasMore: boolean;
	query: PagedQuery;
	replacementContinuationToken: string;
	/**
	 * If useTotalResults is true, then totalResults represents an accurate count.
	 * If False, it does not, and may be estimated/only the size of the current page.
	 * Either way, you should probably always only trust hasMore.
	 * This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one.
	 */
	useTotalResults: boolean;
}

export interface SearchResultOfCommunityLiveStatus {
	results: CommunityLiveStatus[];
	totalResults: number;
	hasMore: boolean;
	query: PagedQuery;
	replacementContinuationToken: string;
	/**
	 * If useTotalResults is true, then totalResults represents an accurate count.
	 * If False, it does not, and may be estimated/only the size of the current page.
	 * Either way, you should probably always only trust hasMore.
	 * This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one.
	 */
	useTotalResults: boolean;
}

export interface SearchResultOfTrendingEntry {
	results: TrendingEntry[];
	totalResults: number;
	hasMore: boolean;
	query: PagedQuery;
	replacementContinuationToken: string;
	/**
	 * If useTotalResults is true, then totalResults represents an accurate count.
	 * If False, it does not, and may be estimated/only the size of the current page.
	 * Either way, you should probably always only trust hasMore.
	 * This is a long-held historical throwback to when we used to do paging with known total results. Those queries toasted our database, and we were left to hastily alter our endpoints and create backward- compatible shims, of which useTotalResults is one.
	 */
	useTotalResults: boolean;
}
