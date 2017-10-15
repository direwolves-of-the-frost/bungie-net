import {Module} from '../module';
import {SearchResultOfCommunityLiveStatus} from '../responses';
import {CommunityLiveStatus} from '../responses/community';
import {PostSearchResponse} from '../responses/forum';
import {BungieMembershipType} from '../schemas';
import {CommunityStatusSort} from '../schemas/community';
import {CommunityContentSortMode, ForumTopicsCategoryFiltersEnum} from '../schemas/forum';
import {PartnershipType} from '../schemas/partnerships';

export class CommunityContent extends Module {
	/**
	 * Returns community content.
	 *
	 * @param {ForumTopicsCategoryFiltersEnum} mediaFilter
	 * @param {number} page
	 * @param {CommunityContentSortMode} sort
	 * @returns {Promise<PostSearchResponse>}
	 * @memberof CommunityContent
	 */
	public GetCommunityContent(mediaFilter: ForumTopicsCategoryFiltersEnum, page: number, sort: CommunityContentSortMode): Promise<PostSearchResponse> {
		return this.client.get(`CommunityContent/Get/${sort}/${mediaFilter}/${page}`);
	}

	/**
	 * Returns info about community members who are live streaming.
	 *
	 * @param {number} page
	 * @param {PartnershipType} partnershipType
	 * @param {CommunityStatusSort} sort
	 * @param {number} [modeHash]
	 * @param {string} [streamLocale]
	 * @returns {Promise<SearchResultOfCommunityLiveStatus>}
	 * @memberof CommunityContent
	 */
	public GetCommunityLiveStatuses(page: number, partnershipType: PartnershipType, sort: CommunityStatusSort, modeHash?: number, streamLocale?: string): Promise<SearchResultOfCommunityLiveStatus> {
		return this.client.get(`CommunityContent/Live/All/${partnershipType}/${sort}/${page}`, { modeHash, streamLocale });
	}

	/**
	 * Returns info about community members who are live streaming in your clans.
	 *
	 * @param {number} page
	 * @param {PartnershipType} partnershipType
	 * @param {CommunityStatusSort} sort
	 * @returns {Promise<SearchResultOfCommunityLiveStatus>}
	 * @memberof CommunityContent
	 */
	public GetCommunityLiveStatusesForClanmates(page: number, partnershipType: PartnershipType, sort: CommunityStatusSort): Promise<SearchResultOfCommunityLiveStatus> {
		return this.client.get(`CommunityContent/Live/Clan/${partnershipType}/${sort}/${page}`);
	}

	/**
	 * Returns info about community members who are live streaming among your friends.
	 *
	 * @param {number} page
	 * @param {PartnershipType} partnershipType
	 * @param {CommunityStatusSort} sort
	 * @returns {Promise<SearchResultOfCommunityLiveStatus>}
	 * @memberof CommunityContent
	 */
	public GetCommunityLiveStatusesForFriends(page: number, partnershipType: PartnershipType, sort: CommunityStatusSort): Promise<SearchResultOfCommunityLiveStatus> {
		return this.client.get(`CommunityContent/Live/Friends/${partnershipType}/${sort}/${page}`);
	}

	/**
	 * Returns info about Featured live streams.
	 *
	 * @param {number} page
	 * @param {PartnershipType} partnershipType
	 * @param {CommunityStatusSort} sort
	 * @param {string} [streamLocale]
	 * @returns {Promise<SearchResultOfCommunityLiveStatus>}
	 * @memberof CommunityContent
	 */
	public GetFeaturedCommunityLiveStatuses(page: number, partnershipType: PartnershipType, sort: CommunityStatusSort, streamLocale?: string): Promise<SearchResultOfCommunityLiveStatus> {
		return this.client.get(`CommunityContent/Live/Featured/${partnershipType}/${sort}/${page}`, { streamLocale });
	}

	/**
	 * Gets the Live Streaming status of a particular Account and Membership Type.
	 *
	 * @param {string} membershipId
	 * @param {BungieMembershipType} membershipType
	 * @param {PartnershipType} partnershipType
	 * @returns {Promise<CommunityLiveStatus>}
	 * @memberof CommunityContent
	 */
	public GetStreamingStatusForMember(membershipId: string, membershipType: BungieMembershipType, partnershipType: PartnershipType): Promise<CommunityLiveStatus> {
		return this.client.get(`CommunityContent/Live/Users/${partnershipType}/${membershipType}/${membershipId}`);
	}
}
