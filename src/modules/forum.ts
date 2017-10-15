import {Module} from '../module';
import {CEListOfForumRecruitmentDetail, Int64, ListOfTagResponse} from '../responses';
import {ForumRecruitmentDetail, PostSearchResponse} from '../responses/forum';
import {SaveMessageResult} from '../responses/messages/responses';
import {ForumPostSortEnum, ForumTopicsCategoryFiltersEnum, ForumTopicsQuickDateEnum, ForumTopicsSortEnum} from '../schemas/forum';

export class Forum extends Module {
	/**
	 * Get topics from any forum.
	 *
	 * @param {ForumTopicsCategoryFiltersEnum} categoryFilter
	 * @param {string} group
	 * @param {number} page
	 * @param {number} pageSize
	 * @param {ForumTopicsQuickDateEnum} quickDate
	 * @param {ForumTopicsSortEnum} sort
	 * @param {string} [locales]
	 * @param {string} [tagstring]
	 * @returns {Promise<PostSearchResponse>}
	 * @memberof Forum
	 */
	public GetTopicsPaged(categoryFilter: ForumTopicsCategoryFiltersEnum, group: string, page: number, pageSize: number, quickDate: ForumTopicsQuickDateEnum, sort: ForumTopicsSortEnum, locales?: string, tagstring?: string): Promise<PostSearchResponse> {
		return this.client.get(`Forum/GetTopicsPaged/${page}/${pageSize}/${group}/${sort}/${quickDate}/${categoryFilter}`, { locales, tagstring });
	}

	/**
	 * Gets a listing of all topics marked as part of the core group.
	 *
	 * @param {ForumTopicsCategoryFiltersEnum} categoryFilter
	 * @param {number} page
	 * @param {ForumTopicsQuickDateEnum} quickDate
	 * @param {ForumTopicsSortEnum} sort
	 * @param {string} [locales]
	 * @returns {Promise<PostSearchResponse>}
	 * @memberof Forum
	 */
	public GetCoreTopicsPaged(categoryFilter: ForumTopicsCategoryFiltersEnum, page: number, quickDate: ForumTopicsQuickDateEnum, sort: ForumTopicsSortEnum, locales?: string): Promise<PostSearchResponse> {
		return this.client.get(`Forum/GetCoreTopicsPaged/${page}/${sort}/${quickDate}/${categoryFilter}`, { locales });
	}

	/**
	 * Returns a thread of posts at the given parent, optionally returning replies to those posts as well as the original parent.
	 *
	 * @param {boolean} getParentPost
	 * @param {number} page
	 * @param {number} pageSize
	 * @param {string} parentPostId
	 * @param {number} replySize
	 * @param {boolean} rootThreadMode
	 * @param {ForumPostSortEnum} sortMode
	 * @param {string} [showbanned]
	 * @returns {Promise<PostSearchResponse>}
	 * @memberof Forum
	 */
	public GetPostsThreadedPaged(getParentPost: boolean, page: number, pageSize: number, parentPostId: string, replySize: number, rootThreadMode: boolean, sortMode: ForumPostSortEnum, showbanned?: string): Promise<PostSearchResponse> {
		return this.client.get(`Forum/GetPostsThreadedPaged/${parentPostId}/${page}/${pageSize}/${replySize}/${getParentPost}/${rootThreadMode}/${sortMode}`, { showbanned });
	}

	/**
	 * Returns a thread of posts starting at the topicId of the input childPostId, optionally returning replies to those posts as well as the original parent.
	 *
	 * @param {string} childPostId
	 * @param {number} page
	 * @param {number} pageSize
	 * @param {number} replySize
	 * @param {boolean} rootThreadMode
	 * @param {ForumPostSortEnum} sortMode
	 * @param {string} [showbanned]
	 * @returns {Promise<PostSearchResponse>}
	 * @memberof Forum
	 */
	public GetPostsThreadedPagedFromChild(childPostId: string, page: number, pageSize: number, replySize: number, rootThreadMode: boolean, sortMode: ForumPostSortEnum, showbanned?: string): Promise<PostSearchResponse> {
		return this.client.get(`Forum/GetPostsThreadedPagedFromChild/${childPostId}/${page}/${pageSize}/${replySize}/${rootThreadMode}/${sortMode}`, { showbanned });
	}

	/**
	 * Returns the post specified and its immediate parent.
	 *
	 * @param {string} childPostId
	 * @param {string} [showbanned]
	 * @returns {Promise<PostSearchResponse>}
	 * @memberof Forum
	 */
	public GetPostAndParent(childPostId: string, showbanned?: string): Promise<PostSearchResponse> {
		return this.client.get(`Forum/GetPostAndParent/${childPostId}`, { showbanned });
	}

	/**
	 * Returns the post specified and its immediate parent of posts that are awaiting approval.
	 *
	 * @param {string} childPostId
	 * @param {string} [showbanned]
	 * @returns {Promise<PostSearchResponse>}
	 * @memberof Forum
	 */
	public GetPostAndParentAwaitingApproval(childPostId: string, showbanned?: string): Promise<PostSearchResponse> {
		return this.client.get(`Forum/GetPostAndParentAwaitingApproval/${childPostId}`, { showbanned });
	}

	/**
	 * Gets the post Id for the given content item's comments, if it exists.
	 *
	 * @param {string} contentId
	 * @returns {Promise<Int64>}
	 * @memberof Forum
	 */
	public GetTopicForContent(contentId: string): Promise<Int64> {
		return this.client.get(`Forum/GetTopicForContent/${contentId}`);
	}

	/**
	 * Gets tag suggestions based on partial text entry, matching them with other tags previously used in the forums.
	 *
	 * @param {string} [partialtag]
	 * @returns {Promise<ListOfTagResponse>}
	 * @memberof Forum
	 */
	public GetForumTagSuggestions(partialtag?: string): Promise<ListOfTagResponse> {
		return this.client.get(`Forum/GetForumTagSuggestions`, { partialtag });
	}

	/**
	 * Gets the specified forum poll.
	 *
	 * @param {string} topicId
	 * @returns {Promise<PostSearchResponse>}
	 * @memberof Forum
	 */
	public GetPoll(topicId: string): Promise<PostSearchResponse> {
		return this.client.get(`Forum/Poll/${topicId}`);
	}

	/**
	 * Allows a user to slot themselves into a recruitment thread fireteam slot. Returns the new state of the fireteam.
	 *
	 * @param {string} topicId
	 * @returns {Promise<ForumRecruitmentDetail>}
	 * @memberof Forum
	 */
	public JoinFireteamThread(topicId: string): Promise<ForumRecruitmentDetail> {
		return this.client.post(`Forum/Recruit/Join/${topicId}`);
	}

	/**
	 * Allows a user to remove themselves from a recruitment thread fireteam slot. Returns the new state of the fireteam.
	 *
	 * @param {string} topicId
	 * @returns {Promise<ForumRecruitmentDetail>}
	 * @memberof Forum
	 */
	public LeaveFireteamThread(topicId: string): Promise<ForumRecruitmentDetail> {
		return this.client.post(`Forum/Recruit/Leave/${topicId}`);
	}

	/**
	 * Allows a recruitment thread owner to kick a join user from the fireteam. Returns the new state of the fireteam.
	 *
	 * @param {string} targetMembershipId
	 * @param {string} topicId
	 * @returns {Promise<ForumRecruitmentDetail>}
	 * @memberof Forum
	 */
	public KickBanFireteamApplicant(targetMembershipId: string, topicId: string): Promise<ForumRecruitmentDetail> {
		return this.client.post(`Forum/Recruit/KickBan/${topicId}/${targetMembershipId}`);
	}

	/**
	 * Allows the owner of a fireteam thread to approve all joined members and start a private message conversation with them.
	 *
	 * @param {string} topicId
	 * @returns {Promise<SaveMessageResult>}
	 * @memberof Forum
	 */
	public ApproveFireteamThread(topicId: string): Promise<SaveMessageResult> {
		return this.client.post(`Forum/Recruit/Approve/${topicId}`);
	}

	/**
	 * Allows the caller to get a list of to 25 recruitment thread summary information objects.
	 *
	 * @returns {Promise<CEListOfForumRecruitmentDetail>}
	 * @memberof Forum
	 */
	public GetRecruitmentThreadSummaries(): Promise<CEListOfForumRecruitmentDetail> {
		return this.client.post(`Forum/Recruit/Summaries`);
	}
}
