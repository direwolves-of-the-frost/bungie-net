import {Module} from '../module';
import {CEListOfPublicPartnershipDetail, ListOfGeneralUser, ListOfUserAlias, ListOfUserTheme} from '../responses';
import {GeneralUser, UserMembershipData} from '../responses/user';
import {BungieMembershipType} from '../schemas';

export class User extends Module {
	/**
	 * Loads a bungienet user by membership id.
	 *
	 * @param {string} id
	 * @returns {Promise<GeneralUser>}
	 * @memberof User
	 */
	public GetBungieNetUserById(id: string): Promise<GeneralUser> {
		return this.client.get(`User/GetBungieNetUserById/${id}`);
	}

	/**
	 * Loads aliases of a bungienet membership id.
	 *
	 * @param {string} id
	 * @returns {Promise<ListOfUserAlias>}
	 * @memberof User
	 */
	public GetUserAliases(id: string): Promise<ListOfUserAlias> {
		return this.client.get(`User/GetUserAliases/${id}`);
	}

	/**
	 * Returns a list of possible users based on the search string
	 *
	 * @param {string} [q]
	 * @returns {Promise<ListOfGeneralUser>}
	 * @memberof User
	 */
	public SearchUsers(q?: string): Promise<ListOfGeneralUser> {
		return this.client.get(`User/SearchUsers`, { q });
	}

	/**
	 * Returns a list of all available user themes.
	 *
	 * @returns {Promise<ListOfUserTheme>}
	 * @memberof User
	 */
	public GetAvailableThemes(): Promise<ListOfUserTheme> {
		return this.client.get(`User/GetAvailableThemes`);
	}

	/**
	 * Returns a list of accounts associated with the supplied membership ID and membership type. This will include all linked accounts (even when hidden) if supplied credentials permit it.
	 *
	 * @param {string} membershipId
	 * @param {BungieMembershipType} membershipType
	 * @returns {Promise<UserMembershipData>}
	 * @memberof User
	 */
	public GetMembershipDataById(membershipId: string, membershipType: BungieMembershipType): Promise<UserMembershipData> {
		return this.client.get(`User/GetMembershipsById/${membershipId}/${membershipType}`);
	}

	/**
	 * Returns a list of accounts associated with signed in user. This is useful for OAuth implementations that do not give you access to the token response.
	 *
	 * @returns {Promise<UserMembershipData>}
	 * @memberof User
	 */
	public GetMembershipDataForCurrentUser(): Promise<UserMembershipData> {
		return this.client.get(`User/GetMembershipsForCurrentUser`);
	}

	/**
	 * Returns a user's linked Partnerships.
	 *
	 * @param {string} membershipId
	 * @returns {Promise<CEListOfPublicPartnershipDetail>}
	 * @memberof User
	 */
	public GetPartnerships(membershipId: string): Promise<CEListOfPublicPartnershipDetail> {
		return this.client.get(`User/${membershipId}/Partnerships`);
	}
}
