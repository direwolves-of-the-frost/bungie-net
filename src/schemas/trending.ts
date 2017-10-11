import {SearchResultOfTrendingEntry} from './';
import {ContentItemPublicContract} from './content';
import {DestinyPublicActivityStatus} from './destiny/activities';
import {DestinyMilestoneContent, DestinyPublicMilestone} from './destiny/milestones';
import {PartnershipType} from './partnerships';

export interface TrendingCategories {
	categories: TrendingCategory[];
}

export interface TrendingCategory {
	categoryName: string;
	entries: SearchResultOfTrendingEntry;
	categoryId: string;
}

/**
 * The list entry view for trending items. Returns just enough to show the item on the trending page.
 */
export interface TrendingEntry {
	/**
	 * The weighted score of this trending item.
	 */
	weight: number;
	isFeatured: boolean;
	/**
	 * We don't know whether the identifier will be a string, a uint, or a long... so we're going to cast it all to a string. But either way, we need any trending item created to have a single unique identifier for its type.
	 */
	identifier: string;
	/**
	 * An enum - unfortunately - dictating all of the possible kinds of trending items that you might get in your result set, in case you want to do custom rendering or call to get the details of the item.
	 */
	entityType: TrendingEntryType;
	/**
	 * The localized "display name/article title/'primary localized identifier'" of the entity.
	 */
	displayName: string;
	/**
	 * If the entity has a localized tagline/subtitle/motto/whatever, that is found here.
	 */
	tagline: string;
	image: string;
	startDate?: string;
	endDate?: string;
	link: string;
	/**
	 * If this is populated, the entry has a related WebM video to show. I am 100% certain I am going to regret putting this directly on TrendingEntry, but it will work so yolo
	 */
	webmVideo: string;
	/**
	 * If this is populated, the entry has a related MP4 video to show. I am 100% certain I am going to regret putting this directly on TrendingEntry, but it will work so yolo
	 */
	mp4Video: string;
	/**
	 * If isFeatured, this image will be populated with whatever the featured image is. Note that this will likely be a very large image, so don't use it all the time.
	 */
	featureImage: string;
}

/**
 * The known entity types that you can have returned from Trending.
 */
export enum TrendingEntryType {
	News = 0,
	DestinyItem = 1,
	DestinyActivity = 2,
	DestinyRitual = 3,
	SupportArticle = 4,
	Creation = 5,
	Stream = 6,
	Update = 7,
	Link = 8,
	ForumTag = 9,
}

export interface TrendingDetail {
	identifier: string;
	entityType: TrendingEntryType;
	news: TrendingEntryNews;
	support: TrendingEntrySupportArticle;
	destinyItem: TrendingEntryDestinyItem;
	destinyActivity: TrendingEntryDestinyActivity;
	destinyRitual: TrendingEntryDestinyRitual;
	creation: TrendingEntryCommunityCreation;
	stream: TrendingEntryCommunityStream;
}

export interface TrendingEntryNews {
	article: ContentItemPublicContract;
}

export interface TrendingEntrySupportArticle {
	article: ContentItemPublicContract;
}

export interface TrendingEntryDestinyItem {
	itemHash: number;
}

export interface TrendingEntryDestinyActivity {
	activityHash: number;
	status: DestinyPublicActivityStatus;
}

export interface TrendingEntryDestinyRitual {
	image: string;
	icon: string;
	title: string;
	subtitle: string;
	dateStart?: string;
	dateEnd?: string;
	/**
	 * A destiny event does not necessarily have a related Milestone, but if it does the details will be returned here.
	 */
	milestoneDetails: DestinyPublicMilestone;
	/**
	 * A destiny event will not necessarily have milestone "custom content", but if it does the details will be here.
	 */
	eventContent: DestinyMilestoneContent;
}

export interface TrendingEntryCommunityCreation {
	media: string;
	title: string;
	author: string;
	authorMembershipId: string;
	postId: string;
	body: string;
	upvotes: number;
}

export interface TrendingEntryCommunityStream {
	image: string;
	title: string;
	partnershipIdentifier: string;
	partnershipType: PartnershipType;
}
