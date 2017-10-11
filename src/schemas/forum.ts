import {GroupResponse} from './groups-v2';
import {IgnoreResponse} from './ignores';
import {PagedQuery} from './queries';
import {TagResponse} from './tags/models/contracts';
import {GeneralUser} from './user';

export enum ForumTopicsCategoryFiltersEnum {
	None = 0,
	Links = 1,
	Questions = 2,
	AnsweredQuestions = 4,
	Media = 8,
	TextOnly = 16,
	Announcement = 32,
	BungieOfficial = 64,
	Polls = 128,
}

export enum ForumTopicsQuickDateEnum {
	All = 0,
	LastYear = 1,
	LastMonth = 2,
	LastWeek = 3,
	LastDay = 4,
}

export enum ForumTopicsSortEnum {
	Default = 0,
	LastReplied = 1,
	MostReplied = 2,
	Popularity = 3,
	Controversiality = 4,
	Liked = 5,
	HighestRated = 6,
	MostUpvoted = 7,
}

export interface PostResponse {
	lastReplyTimestamp: string;
	IsPinned: boolean;
	urlMediaType: ForumMediaType;
	thumbnail: string;
	popularity: ForumPostPopularity;
	isActive: boolean;
	isAnnouncement: boolean;
	userRating: number;
	userHasRated: boolean;
	userHasMutedPost: boolean;
	latestReplyPostId: string;
	latestReplyAuthorId: string;
	ignoreStatus: IgnoreResponse;
	locale: string;
}

export enum ForumMediaType {
	None = 0,
	Image = 1,
	Video = 2,
	Youtube = 3,
}

export enum ForumPostPopularity {
	Empty = 0,
	Default = 1,
	Discussed = 2,
	CoolStory = 3,
	HeatingUp = 4,
	Hot = 5,
}

export enum ForumPostCategoryEnums {
	None = 0,
	TextOnly = 1,
	Media = 2,
	Link = 4,
	Poll = 8,
	Question = 16,
	Answered = 32,
	Announcement = 64,
	ContentComment = 128,
	BungieOfficial = 256,
	NinjaOfficial = 512,
	Recruitment = 1024,
}

export enum ForumFlagsEnum {
	None = 0,
	BungieStaffPost = 1,
	ForumNinjaPost = 2,
	ForumMentorPost = 4,
	TopicBungieStaffPosted = 8,
	TopicBungieVolunteerPosted = 16,
	QuestionAnsweredByBungie = 32,
	QuestionAnsweredByNinja = 64,
	CommunityContent = 128,
}

export interface PostSearchResponse {
	relatedPosts: PostResponse[];
	authors: GeneralUser[];
	groups: GroupResponse[];
	searchedTags: TagResponse[];
	polls: PollResponse[];
	recruitmentDetails: ForumRecruitmentDetail[];
	availablePages?: number;
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

export interface PollResponse {
	topicId: string;
	results: PollResult[];
	totalVotes: number;
}

export interface PollResult {
	answerText: string;
	answerSlot: number;
	lastVoteDate: string;
	votes: number;
	requestingUserVoted: boolean;
}

export interface ForumRecruitmentDetail {
	topicId: string;
	microphoneRequired: boolean;
	intensity: ForumRecruitmentIntensityLabel;
	tone: ForumRecruitmentToneLabel;
	approved: boolean;
	conversationId?: string;
	playerSlotsTotal: number;
	playerSlotsRemaining: number;
	Fireteam: GeneralUser[];
	kickedPlayerIds: string[];
}

export enum ForumRecruitmentIntensityLabel {
	None = 0,
	Casual = 1,
	Professional = 2,
}

export enum ForumRecruitmentToneLabel {
	None = 0,
	FamilyFriendly = 1,
	Rowdy = 2,
}

export enum ForumPostSortEnum {
	Default = 0,
	OldestFirst = 1,
}

export enum CommunityContentSortMode {
	Trending = 0,
	Latest = 1,
	HighestRated = 2,
}
