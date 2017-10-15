import {Module} from '../module';
import {Boolean, CEListOfGroupOptionalConversation, DictionaryOfint32Andstring, Int32, Int64, ListOfEntityActionResult, ListOfGroupTheme, SearchResultOfGroupBan, SearchResultOfGroupMember, SearchResultOfGroupMemberApplication} from '../responses';
import {GroupApplicationResponse, GroupCreationResponse, GroupMemberLeaveResult, GroupMembershipSearchResponse, GroupPotentialMembershipSearchResponse, GroupResponse, GroupSearchResponse} from '../responses/groups-v2';
import {BungieMembershipType} from '../schemas';
import {GroupPotentialMemberStatus, GroupsForMemberFilter, GroupType, RuntimeGroupMemberType} from '../schemas/groups-v2';

export class GroupV2 extends Module {
	/**
	 * Returns a list of all available group avatars for the signed-in user.
	 *
	 * @returns {Promise<DictionaryOfint32Andstring>}
	 * @memberof GroupV2
	 */
	public GetAvailableAvatars(): Promise<DictionaryOfint32Andstring> {
		return this.client.get(`GroupV2/GetAvailableAvatars`);
	}

	/**
	 * Returns a list of all available group themes.
	 *
	 * @returns {Promise<ListOfGroupTheme>}
	 * @memberof GroupV2
	 */
	public GetAvailableThemes(): Promise<ListOfGroupTheme> {
		return this.client.get(`GroupV2/GetAvailableThemes`);
	}

	/**
	 * Gets the state of the user's clan invite preferences for a particular membership type - true if they wish to be invited to clans, false otherwise.
	 *
	 * @param {BungieMembershipType} mType
	 * @returns {Promise<Boolean>}
	 * @memberof GroupV2
	 */
	public GetUserClanInviteSetting(mType: BungieMembershipType): Promise<Boolean> {
		return this.client.get(`GroupV2/GetUserClanInviteSetting/${mType}`);
	}

	/**
	 * Sets the state of the user's clan invite preferences - true if they wish to be invited to clans, false otherwise.
	 *
	 * @param {boolean} allowInvites
	 * @param {BungieMembershipType} mType
	 * @returns {Promise<Int32>}
	 * @memberof GroupV2
	 */
	public SetUserClanInviteSetting(allowInvites: boolean, mType: BungieMembershipType): Promise<Int32> {
		return this.client.post(`GroupV2/SetUserClanInviteSetting/${mType}/${allowInvites}`);
	}

	/**
	 * Gets groups recommended for you based on the groups to whom those you follow belong.
	 *
	 * @returns {Promise<GroupSearchResponse>}
	 * @memberof GroupV2
	 */
	public GetRecommendedGroups(): Promise<GroupSearchResponse> {
		return this.client.post(`GroupV2/Recommended`);
	}

	/**
	 * Search for Groups.
	 *
	 * @returns {Promise<GroupSearchResponse>}
	 * @memberof GroupV2
	 */
	public GroupSearch(): Promise<GroupSearchResponse> {
		return this.client.post(`GroupV2/Search`);
	}

	/**
	 * Get information about a specific group of the given ID.
	 *
	 * @param {string} groupId
	 * @returns {Promise<GroupResponse>}
	 * @memberof GroupV2
	 */
	public GetGroup(groupId: string): Promise<GroupResponse> {
		return this.client.get(`GroupV2/${groupId}`);
	}

	/**
	 * Get information about a specific group with the given name and type.
	 *
	 * @param {string} groupName
	 * @param {GroupType} groupType
	 * @returns {Promise<GroupResponse>}
	 * @memberof GroupV2
	 */
	public GetGroupByName(groupName: string, groupType: GroupType): Promise<GroupResponse> {
		return this.client.get(`GroupV2/Name/${groupName}/${groupType}`);
	}

	/**
	 * Gets a list of available optional conversation channels and their settings.
	 *
	 * @param {string} groupId
	 * @returns {Promise<CEListOfGroupOptionalConversation>}
	 * @memberof GroupV2
	 */
	public GetGroupOptionalConversations(groupId: string): Promise<CEListOfGroupOptionalConversation> {
		return this.client.get(`GroupV2/${groupId}/OptionalConversations`);
	}

	/**
	 * Create a new group.
	 *
	 * @returns {Promise<GroupCreationResponse>}
	 * @memberof GroupV2
	 */
	public CreateGroup(): Promise<GroupCreationResponse> {
		return this.client.post(`GroupV2/Create`);
	}

	/**
	 * Edit an existing group. You must have suitable permissions in the group to perform this operation. This latest revision will only edit the fields you pass in - pass null for properties you want to leave unaltered.
	 *
	 * @param {string} groupId
	 * @returns {Promise<Int32>}
	 * @memberof GroupV2
	 */
	public EditGroup(groupId: string): Promise<Int32> {
		return this.client.post(`GroupV2/${groupId}/Edit`);
	}

	/**
	 * Edit an existing group's clan banner. You must have suitable permissions in the group to perform this operation. All fields are required.
	 *
	 * @param {string} groupId
	 * @returns {Promise<Int32>}
	 * @memberof GroupV2
	 */
	public EditClanBanner(groupId: string): Promise<Int32> {
		return this.client.post(`GroupV2/${groupId}/EditClanBanner`);
	}

	/**
	 * Edit group options only available to a founder. You must have suitable permissions in the group to perform this operation.
	 *
	 * @param {string} groupId
	 * @returns {Promise<Int32>}
	 * @memberof GroupV2
	 */
	public EditFounderOptions(groupId: string): Promise<Int32> {
		return this.client.post(`GroupV2/${groupId}/EditFounderOptions`);
	}

	/**
	 * Add a new optional conversation/chat channel. Requires admin permissions to the group.
	 *
	 * @param {string} groupId
	 * @returns {Promise<Int64>}
	 * @memberof GroupV2
	 */
	public AddOptionalConversation(groupId: string): Promise<Int64> {
		return this.client.post(`GroupV2/${groupId}/OptionalConversations/Add`);
	}

	/**
	 * Edit the settings of an optional conversation/chat channel. Requires admin permissions to the group.
	 *
	 * @param {string} conversationId
	 * @param {string} groupId
	 * @returns {Promise<Int64>}
	 * @memberof GroupV2
	 */
	public EditOptionalConversation(conversationId: string, groupId: string): Promise<Int64> {
		return this.client.post(`GroupV2/${groupId}/OptionalConversations/Edit/${conversationId}`);
	}

	/**
	 * Get the list of members in a given group.
	 *
	 * @param {string} groupId
	 * @param {RuntimeGroupMemberType} [memberType]
	 * @param {string} [nameSearch]
	 * @returns {Promise<SearchResultOfGroupMember>}
	 * @memberof GroupV2
	 */
	public GetMembersOfGroup(groupId: string, memberType?: RuntimeGroupMemberType, nameSearch?: string): Promise<SearchResultOfGroupMember> {
		return this.client.get(`GroupV2/${groupId}/Members`, { memberType, nameSearch });
	}

	/**
	 * Get the list of members in a given group who are of admin level or higher.
	 *
	 * @param {string} groupId
	 * @returns {Promise<SearchResultOfGroupMember>}
	 * @memberof GroupV2
	 */
	public GetAdminsAndFounderOfGroup(groupId: string): Promise<SearchResultOfGroupMember> {
		return this.client.get(`GroupV2/${groupId}/AdminsAndFounder`);
	}

	/**
	 * Edit the membership type of a given member. You must have suitable permissions in the group to perform this operation.
	 *
	 * @param {string} groupId
	 * @param {string} membershipId
	 * @param {BungieMembershipType} membershipType
	 * @param {RuntimeGroupMemberType} memberType
	 * @returns {Promise<Int32>}
	 * @memberof GroupV2
	 */
	public EditGroupMembership(groupId: string, membershipId: string, membershipType: BungieMembershipType, memberType: RuntimeGroupMemberType): Promise<Int32> {
		return this.client.post(`GroupV2/${groupId}/Members/${membershipType}/${membershipId}/SetMembershipType/${memberType}`);
	}

	/**
	 * Kick a member from the given group, forcing them to reapply if they wish to re-join the group. You must have suitable permissions in the group to perform this operation.
	 *
	 * @param {string} groupId
	 * @param {string} membershipId
	 * @param {BungieMembershipType} membershipType
	 * @returns {Promise<GroupMemberLeaveResult>}
	 * @memberof GroupV2
	 */
	public KickMember(groupId: string, membershipId: string, membershipType: BungieMembershipType): Promise<GroupMemberLeaveResult> {
		return this.client.post(`GroupV2/${groupId}/Members/${membershipType}/${membershipId}/Kick`);
	}

	/**
	 * Bans the requested member from the requested group for the specified period of time.
	 *
	 * @param {string} groupId
	 * @param {string} membershipId
	 * @param {BungieMembershipType} membershipType
	 * @returns {Promise<Int32>}
	 * @memberof GroupV2
	 */
	public BanMember(groupId: string, membershipId: string, membershipType: BungieMembershipType): Promise<Int32> {
		return this.client.post(`GroupV2/${groupId}/Members/${membershipType}/${membershipId}/Ban`);
	}

	/**
	 * Unbans the requested member, allowing them to re-apply for membership.
	 *
	 * @param {string} groupId
	 * @param {string} membershipId
	 * @param {BungieMembershipType} membershipType
	 * @returns {Promise<Int32>}
	 * @memberof GroupV2
	 */
	public UnbanMember(groupId: string, membershipId: string, membershipType: BungieMembershipType): Promise<Int32> {
		return this.client.post(`GroupV2/${groupId}/Members/${membershipType}/${membershipId}/Unban`);
	}

	/**
	 * Get the list of banned members in a given group. Only accessible to group Admins and above. Not applicable to all groups. Check group features.
	 *
	 * @param {string} groupId
	 * @returns {Promise<SearchResultOfGroupBan>}
	 * @memberof GroupV2
	 */
	public GetBannedMembersOfGroup(groupId: string): Promise<SearchResultOfGroupBan> {
		return this.client.get(`GroupV2/${groupId}/Banned`);
	}

	/**
	 * An administrative method to allow the founder of a group or clan to give up their position to another admin permanently.
	 *
	 * @param {string} founderIdNew
	 * @param {string} groupId
	 * @param {BungieMembershipType} membershipType
	 * @returns {Promise<Boolean>}
	 * @memberof GroupV2
	 */
	public AbdicateFoundership(founderIdNew: string, groupId: string, membershipType: BungieMembershipType): Promise<Boolean> {
		return this.client.post(`GroupV2/${groupId}/Admin/AbdicateFoundership/${membershipType}/${founderIdNew}`);
	}

	/**
	 * Request permission to join the given group.
	 *
	 * @param {string} groupId
	 * @param {BungieMembershipType} membershipType
	 * @returns {Promise<GroupApplicationResponse>}
	 * @memberof GroupV2
	 */
	public RequestGroupMembership(groupId: string, membershipType: BungieMembershipType): Promise<GroupApplicationResponse> {
		return this.client.post(`GroupV2/${groupId}/Members/Apply/${membershipType}`);
	}

	/**
	 * Get the list of users who are awaiting a decision on their application to join a given group. Modified to include application info.
	 *
	 * @param {string} groupId
	 * @returns {Promise<SearchResultOfGroupMemberApplication>}
	 * @memberof GroupV2
	 */
	public GetPendingMemberships(groupId: string): Promise<SearchResultOfGroupMemberApplication> {
		return this.client.get(`GroupV2/${groupId}/Members/Pending`);
	}

	/**
	 * Get the list of users who have been invited into the group.
	 *
	 * @param {string} groupId
	 * @returns {Promise<SearchResultOfGroupMemberApplication>}
	 * @memberof GroupV2
	 */
	public GetInvitedIndividuals(groupId: string): Promise<SearchResultOfGroupMemberApplication> {
		return this.client.get(`GroupV2/${groupId}/Members/InvitedIndividuals`);
	}

	/**
	 * Rescind your application to join the given group or leave the group if you are already a member..
	 *
	 * @param {string} groupId
	 * @param {BungieMembershipType} membershipType
	 * @returns {Promise<GroupMemberLeaveResult>}
	 * @memberof GroupV2
	 */
	public RescindGroupMembership(groupId: string, membershipType: BungieMembershipType): Promise<GroupMemberLeaveResult> {
		return this.client.post(`GroupV2/${groupId}/Members/Rescind/${membershipType}`);
	}

	/**
	 * Approve all of the pending users for the given group.
	 *
	 * @param {string} groupId
	 * @returns {Promise<ListOfEntityActionResult>}
	 * @memberof GroupV2
	 */
	public ApproveAllPending(groupId: string): Promise<ListOfEntityActionResult> {
		return this.client.post(`GroupV2/${groupId}/Members/ApproveAll`);
	}

	/**
	 * Deny all of the pending users for the given group.
	 *
	 * @param {string} groupId
	 * @returns {Promise<ListOfEntityActionResult>}
	 * @memberof GroupV2
	 */
	public DenyAllPending(groupId: string): Promise<ListOfEntityActionResult> {
		return this.client.post(`GroupV2/${groupId}/Members/DenyAll`);
	}

	/**
	 * Approve all of the pending users for the given group.
	 *
	 * @param {string} groupId
	 * @returns {Promise<ListOfEntityActionResult>}
	 * @memberof GroupV2
	 */
	public ApprovePendingForList(groupId: string): Promise<ListOfEntityActionResult> {
		return this.client.post(`GroupV2/${groupId}/Members/ApproveList`);
	}

	/**
	 * Deny all of the pending users for the given group that match the passed-in .
	 *
	 * @param {string} groupId
	 * @returns {Promise<ListOfEntityActionResult>}
	 * @memberof GroupV2
	 */
	public DenyPendingForList(groupId: string): Promise<ListOfEntityActionResult> {
		return this.client.post(`GroupV2/${groupId}/Members/DenyList`);
	}

	/**
	 * Get information about the groups that a given member has joined.
	 *
	 * @param {GroupsForMemberFilter} filter
	 * @param {GroupType} groupType
	 * @param {string} membershipId
	 * @param {BungieMembershipType} membershipType
	 * @returns {Promise<GroupMembershipSearchResponse>}
	 * @memberof GroupV2
	 */
	public GetGroupsForMember(filter: GroupsForMemberFilter, groupType: GroupType, membershipId: string, membershipType: BungieMembershipType): Promise<GroupMembershipSearchResponse> {
		return this.client.get(`GroupV2/User/${membershipType}/${membershipId}/${filter}/${groupType}`);
	}

	/**
	 * Get information about the groups that a given member has applied to or been invited to.
	 *
	 * @param {GroupPotentialMemberStatus} filter
	 * @param {GroupType} groupType
	 * @param {string} membershipId
	 * @param {BungieMembershipType} membershipType
	 * @returns {Promise<GroupPotentialMembershipSearchResponse>}
	 * @memberof GroupV2
	 */
	public GetPotentialGroupsForMember(filter: GroupPotentialMemberStatus, groupType: GroupType, membershipId: string, membershipType: BungieMembershipType): Promise<GroupPotentialMembershipSearchResponse> {
		return this.client.get(`GroupV2/User/Potential/${membershipType}/${membershipId}/${filter}/${groupType}`);
	}

	/**
	 * Invite a user to join this group.
	 *
	 * @param {string} groupId
	 * @param {string} membershipId
	 * @param {BungieMembershipType} membershipType
	 * @returns {Promise<GroupApplicationResponse>}
	 * @memberof GroupV2
	 */
	public IndividualGroupInvite(groupId: string, membershipId: string, membershipType: BungieMembershipType): Promise<GroupApplicationResponse> {
		return this.client.post(`GroupV2/${groupId}/Members/IndividualInvite/${membershipType}/${membershipId}`);
	}

	/**
	 * Cancels a pending invitation to join a group.
	 *
	 * @param {string} groupId
	 * @param {string} membershipId
	 * @param {BungieMembershipType} membershipType
	 * @returns {Promise<GroupApplicationResponse>}
	 * @memberof GroupV2
	 */
	public IndividualGroupInviteCancel(groupId: string, membershipId: string, membershipType: BungieMembershipType): Promise<GroupApplicationResponse> {
		return this.client.post(`GroupV2/${groupId}/Members/IndividualInviteCancel/${membershipType}/${membershipId}`);
	}
}
