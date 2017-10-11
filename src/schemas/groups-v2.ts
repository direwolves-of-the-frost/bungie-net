import {BungieMembershipType} from './';
import {DestinyProgression} from './destiny';
import {IgnoreLength} from './ignores';
import {PagedQuery} from './queries';
import {UserInfoCard, UserMembership} from './user';

export interface GroupResponse {
	detail: GroupV2;
	founder: GroupMember;
	alliedIds: string[];
	parentGroup: GroupV2;
	allianceStatus: GroupAllianceStatus;
	groupJoinInviteCount: number;
	/**
	 * This property will be populated if the authenticated user is a member of the group. Note that because of account linking, a user can sometimes be part of a clan more than once. As such, this returns the highest member type available.
	 */
	currentUserMemberMap: {[field: number]: GroupMember};
	/**
	 * This property will be populated if the authenticated user is an applicant or has an outstanding invitation to join. Note that because of account linking, a user can sometimes be part of a clan more than once.
	 */
	currentUserPotentialMemberMap: {[field: number]: GroupPotentialMember};
}

export interface GroupV2 {
	groupId: string;
	name: string;
	groupType: GroupType;
	membershipIdCreated: string;
	creationDate: string;
	modificationDate: string;
	about: string;
	tags: string[];
	memberCount: number;
	isPublic: boolean;
	isPublicTopicAdminOnly: boolean;
	primaryAlliedGroupId: string;
	motto: string;
	allowChat: boolean;
	isDefaultPostPublic: boolean;
	chatSecurity: ChatSecuritySetting;
	locale: string;
	avatarImageIndex: number;
	homepage: GroupHomepage;
	membershipOption: MembershipOption;
	defaultPublicity: GroupPostPublicity;
	theme: string;
	bannerPath: string;
	avatarPath: string;
	isAllianceOwner: boolean;
	conversationId: string;
	enableInvitationMessagingForAdmins: boolean;
	banExpireDate?: string;
	features: GroupFeatures;
	clanInfo: GroupV2ClanInfoAndInvestment;
}

export enum GroupType {
	General = 0,
	Clan = 1,
}

export enum ChatSecuritySetting {
	Group = 0,
	Admins = 1,
}

export enum GroupHomepage {
	Wall = 0,
	Forum = 1,
	AllianceForum = 2,
}

export enum MembershipOption {
	Reviewed = 0,
	Open = 1,
	Closed = 2,
}

export enum GroupPostPublicity {
	Public = 0,
	Alliance = 1,
	Private = 2,
}

export interface GroupFeatures {
	maximumMembers: number;
	/**
	 * Maximum number of groups of this type a typical membership may join. For example, a user may join about 50 General groups with their Bungie.net account. They may join one clan per Destiny membership.
	 */
	maximumMembershipsOfGroupType: number;
	capabilities: Capabilities;
	membershipTypes: BungieMembershipType[];
	/**
	 * Minimum Member Level allowed to invite new members to group
	 * Always Allowed: Founder, Acting Founder
	 * True means admins have this power, false means they don't
	 * Default is false for clans, true for groups.
	 */
	invitePermissionOverride: boolean;
	/**
	 * Minimum Member Level allowed to update group culture
	 * Always Allowed: Founder, Acting Founder
	 * True means admins have this power, false means they don't
	 * Default is false for clans, true for groups.
	 */
	updateCulturePermissionOverride: boolean;
	/**
	 * Minimum Member Level allowed to host guided games
	 * Always Allowed: Founder, Acting Founder, Admin
	 * Allowed Overrides: None, Member, Beginner
	 * Default is Member for clans, None for groups, although this means nothing for groups.
	 */
	hostGuidedGamePermissionOverride: HostGuidedGamesPermissionLevel;
	/**
	 * Minimum Member Level allowed to update banner
	 * Always Allowed: Founder, Acting Founder
	 * True means admins have this power, false means they don't
	 * Default is false for clans, true for groups.
	 */
	updateBannerPermissionOverride: boolean;
	/**
	 * Level to join a member at when accepting an invite, application, or joining an open clan
	 * Default is Beginner.
	 */
	joinLevel: RuntimeGroupMemberType;
}

export enum Capabilities {
	None = 0,
	Leaderboards = 1,
	Callsign = 2,
	OptionalConversations = 4,
	ClanBanner = 8,
	D2InvestmentData = 16,
	Tags = 32,
	Alliances = 64,
}

/**
 * Used for setting the guided game permission level override (admins and founders can always host guided games).
 */
export enum HostGuidedGamesPermissionLevel {
	None = 0,
	Beginner = 1,
	Member = 2,
}

/**
 * The member levels used by all V2 Groups API. Individual group types use their own mappings in their native storage (general uses BnetDbGroupMemberType and D2 clans use ClanMemberLevel), but they are all translated to this in the runtime api. These runtime values should NEVER be stored anywhere, so the values can be changed as necessary.
 */
export enum RuntimeGroupMemberType {
	None = 0,
	Beginner = 1,
	Member = 2,
	Admin = 3,
	ActingFounder = 4,
	Founder = 5,
}

/**
 * This contract contains clan-specific group information. It does not include any investment data.
 */
export interface GroupV2ClanInfo {
	clanCallsign: string;
	clanBannerData: ClanBanner;
}

export interface ClanBanner {
	decalId: number;
	decalColorId: number;
	decalBackgroundColorId: number;
	gonfalonId: number;
	gonfalonColorId: number;
	gonfalonDetailId: number;
	gonfalonDetailColorId: number;
}

/**
 * The same as GroupV2ClanInfo, but includes any investment data.
 */
export interface GroupV2ClanInfoAndInvestment {
	d2ClanProgressions: {[field: number]: DestinyProgression};
	clanCallsign: string;
	clanBannerData: ClanBanner;
}

export interface GroupUserBase {
	groupId: string;
	destinyUserInfo: UserInfoCard;
	bungieNetUserInfo: UserInfoCard;
	joinDate: string;
}

export interface GroupMember {
	memberType: RuntimeGroupMemberType;
	isOnline: boolean;
	groupId: string;
	destinyUserInfo: UserInfoCard;
	bungieNetUserInfo: UserInfoCard;
	joinDate: string;
}

export enum GroupAllianceStatus {
	Unallied = 0,
	Parent = 1,
	Child = 2,
}

export interface GroupPotentialMember {
	potentialStatus: GroupPotentialMemberStatus;
	groupId: string;
	destinyUserInfo: UserInfoCard;
	bungieNetUserInfo: UserInfoCard;
	joinDate: string;
}

export enum GroupPotentialMemberStatus {
	None = 0,
	Applicant = 1,
	Invitee = 2,
}

/**
 * A small infocard of group information, usually used for when a list of groups are returned
 */
export interface GroupV2Card {
	groupId: string;
	name: string;
	groupType: GroupType;
	creationDate: string;
	about: string;
	motto: string;
	memberCount: number;
	locale: string;
	membershipOption: MembershipOption;
	capabilities: Capabilities;
	clanInfo: GroupV2ClanInfo;
	avatarPath: string;
	theme: string;
}

export interface GroupSearchResponse {
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

export interface GroupQuery {
	name: string;
	groupType: GroupType;
	creationDate: GroupDateRange;
	sortBy: GroupSortBy;
	groupMemberCountFilter?: number;
	localeFilter: string;
	tagText: string;
	itemsPerPage: number;
	currentPage: number;
	requestContinuationToken: string;
}

export enum GroupDateRange {
	All = 0,
	PastDay = 1,
	PastWeek = 2,
	PastMonth = 3,
	PastYear = 4,
}

export enum GroupSortBy {
	Name = 0,
	Date = 1,
	Popularity = 2,
	Id = 3,
}

export enum GroupMemberCountFilter {
	All = 0,
	OneToTen = 1,
	ElevenToOneHundred = 2,
	GreaterThanOneHundred = 3,
}

export interface GroupOptionalConversation {
	groupId: string;
	conversationId: string;
	chatEnabled: boolean;
	chatName: string;
	chatSecurity: ChatSecuritySetting;
}

export interface GroupCreationResponse {
	groupId: string;
}

export interface GroupAction {
	/**
	 * Type of group, either Bungie.net hosted group, or a game services hosted clan.
	 */
	groupType: GroupType;
	name: string;
	about: string;
	motto: string;
	theme: string;
	avatarImageIndex: number;
	tags: string;
	isPublic: boolean;
	membershipOption: MembershipOption;
	isPublicTopicAdminOnly: boolean;
	isDefaultPostPublic: boolean;
	allowChat: boolean;
	isDefaultPostAlliance: boolean;
	chatSecurity: ChatSecuritySetting;
	callsign: string;
	locale: string;
	homepage: GroupHomepage;
	/**
	 * When operation needs a platform specific account ID for the present user, use this property. In particular, groupType of Clan requires this value to be set.
	 */
	platformMembershipType: BungieMembershipType;
}

export interface GroupEditAction {
	name: string;
	about: string;
	motto: string;
	theme: string;
	avatarImageIndex?: number;
	tags: string;
	isPublic?: boolean;
	membershipOption?: number;
	isPublicTopicAdminOnly?: boolean;
	allowChat?: boolean;
	chatSecurity?: number;
	callsign: string;
	locale: string;
	homepage?: number;
	enableInvitationMessagingForAdmins?: boolean;
	defaultPublicity?: number;
}

export interface GroupOptionsEditAction {
	/**
	 * Minimum Member Level allowed to invite new members to group
	 * Always Allowed: Founder, Acting Founder
	 * True means admins have this power, false means they don't
	 * Default is false for clans, true for groups.
	 */
	InvitePermissionOverride?: boolean;
	/**
	 * Minimum Member Level allowed to update group culture
	 * Always Allowed: Founder, Acting Founder
	 * True means admins have this power, false means they don't
	 * Default is false for clans, true for groups.
	 */
	UpdateCulturePermissionOverride?: boolean;
	/**
	 * Minimum Member Level allowed to host guided games
	 * Always Allowed: Founder, Acting Founder, Admin
	 * Allowed Overrides: None, Member, Beginner
	 * Default is Member for clans, None for groups, although this means nothing for groups.
	 */
	HostGuidedGamePermissionOverride?: number;
	/**
	 * Minimum Member Level allowed to update banner
	 * Always Allowed: Founder, Acting Founder
	 * True means admins have this power, false means they don't
	 * Default is false for clans, true for groups.
	 */
	UpdateBannerPermissionOverride?: boolean;
	/**
	 * Level to join a member at when accepting an invite, application, or joining an open clan
	 * Default is Beginner.
	 */
	JoinLevel?: number;
}

export interface GroupOptionalConversationAddRequest {
	chatName: string;
	chatSecurity: ChatSecuritySetting;
}

export interface GroupOptionalConversationEditRequest {
	chatEnabled?: boolean;
	chatName: string;
	chatSecurity?: number;
}

export interface GroupMemberLeaveResult {
	group: GroupV2;
	groupDeleted: boolean;
}

export interface GroupBanRequest {
	comment: string;
	length: IgnoreLength;
}

export interface GroupBan {
	groupId: string;
	lastModifiedBy: UserInfoCard;
	createdBy: UserInfoCard;
	dateBanned: string;
	dateExpires: string;
	comment: string;
	bungieNetUserInfo: UserInfoCard;
	destinyUserInfo: UserInfoCard;
}

export interface GroupApplicationResponse {
	resolution: GroupApplicationResolveState;
}

export enum GroupApplicationResolveState {
	Unresolved = 0,
	Accepted = 1,
	Denied = 2,
	Rescinded = 3,
}

export interface GroupApplicationRequest {
	message: string;
}

export interface GroupMemberApplication {
	groupId: string;
	creationDate: string;
	resolveState: GroupApplicationResolveState;
	resolveDate?: string;
	resolvedByMembershipId?: string;
	requestMessage: string;
	resolveMessage: string;
	destinyUserInfo: UserInfoCard;
	bungieNetUserInfo: UserInfoCard;
}

export interface GroupApplicationListRequest {
	memberships: UserMembership[];
	message: string;
}

export enum GroupsForMemberFilter {
	All = 0,
	Founded = 1,
	NonFounded = 2,
}

export interface GroupMembershipBase {
	group: GroupV2;
}

export interface GroupMembership {
	member: GroupMember;
	group: GroupV2;
}

export interface GroupMembershipSearchResponse {
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

export interface GroupPotentialMembership {
	member: GroupPotentialMember;
	group: GroupV2;
}

export interface GroupPotentialMembershipSearchResponse {
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
