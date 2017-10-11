import {PartnershipType} from './partnerships';
import {UserInfoCard} from './user';

export enum CommunityStatusSort {
	Viewers = 0,
	Trending = 1,
	OverallViewers = 2,
	Followers = 3,
}

export interface CommunityLiveStatus {
	dateStatusUpdated: string;
	url: string;
	partnershipIdentifier: string;
	partnershipType: PartnershipType;
	thumbnail: string;
	thumbnailSmall: string;
	thumbnailLarge: string;
	destinyCharacterId: string;
	userInfo: UserInfoCard;
	currentActivityHash: number;
	dateLastPlayed: string;
	dateStreamStarted: string;
	locale: string;
	currentViewers: number;
	followers: number;
	overallViewers: number;
	isFeatured: boolean;
	title: string;
	activityModeHash: number;
	dateFeatured?: string;
	trendingValue: number;
	isSubscribable: boolean;
}
