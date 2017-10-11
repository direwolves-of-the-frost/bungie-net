/**
 * All the partnership info that's fit to expose externally, if we care to do so.
 */
export interface PublicPartnershipDetail {
	partnerType: PartnershipType;
	identifier: string;
	name: string;
	icon: string;
}

/**
 * Representing external partners to which BNet users can link accounts, but that are not Account System credentials: partnerships that BNet uses exclusively for data.
 */
export enum PartnershipType {
	None = 0,
	Twitch = 1,
}
