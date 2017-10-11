import {BungieMembershipType} from '../';
import {IgnoreResponse} from '../ignores';

export interface GeneralUser {
	membershipId: string;
	uniqueName: string;
	normalizedName: string;
	displayName: string;
	profilePicture: number;
	profileTheme: number;
	userTitle: number;
	successMessageFlags: string;
	isDeleted: boolean;
	about: string;
	firstAccess?: string;
	lastUpdate?: string;
	legacyPortalUID?: string;
	context: UserToUserContext;
	psnDisplayName: string;
	xboxDisplayName: string;
	fbDisplayName: string;
	showActivity?: boolean;
	locale: string;
	localeInheritDefault: boolean;
	lastBanReportId?: string;
	showGroupMessaging: boolean;
	profilePicturePath: string;
	profilePictureWidePath: string;
	profileThemeName: string;
	userTitleDisplay: string;
	statusText: string;
	statusDate: string;
	profileBanExpire?: string;
	blizzardDisplayName: string;
}

export interface UserToUserContext {
	isFollowing: boolean;
	ignoreStatus: IgnoreResponse;
	globalIgnoreEndDate?: string;
}

export interface UserMembershipData {
	/**
	 * this allows you to see destiny memberships that are visible and linked to this account (regardless of whether or not they have characters on the world server)
	 */
	destinyMemberships: UserInfoCard[];
	bungieNetUser: GeneralUser;
}

/**
 * Very basic info about a user as returned by the Account server.
 */
export interface UserMembership {
	/**
	 * Type of the membership.
	 */
	membershipType: BungieMembershipType;
	/**
	 * Membership ID as they user is known in the Accounts service
	 */
	membershipId: string;
	/**
	 * Display Name the player has chosen for themselves. The display name is optional when the data type is used as input to a platform API.
	 */
	displayName: string;
}

/**
 * This contract supplies basic information commonly used to display a minimal amount of information about a user. Take care to not add more properties here unless the property applies in all (or at least the majority) of the situations where UserInfoCard is used. Avoid adding game specific or platform specific details here. In cases where UserInfoCard is a subset of the data needed in a contract, use UserInfoCard as a property of other contracts.
 */
export interface UserInfoCard {
	/**
	 * A platform specific additional display name - ex: psn Real Name, bnet Unique Name, etc.
	 */
	supplementalDisplayName: string;
	/**
	 * URL the Icon if available.
	 */
	iconPath: string;
	/**
	 * Type of the membership.
	 */
	membershipType: BungieMembershipType;
	/**
	 * Membership ID as they user is known in the Accounts service
	 */
	membershipId: string;
	/**
	 * Display Name the player has chosen for themselves. The display name is optional when the data type is used as input to a platform API.
	 */
	displayName: string;
}

export interface AckState {
	/**
	 * Indicates the related item has not been acknowledged.
	 */
	needsAck: boolean;
	/**
	 * Identifier to use when acknowledging the related item. [category]:[entityId]:[targetId]
	 */
	ackId: string;
}
