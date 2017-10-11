/**
 * DestinyManifest is the external-facing contract for just the properties needed by those calling the Destiny Platform.
 */
export interface DestinyManifest {
	version: string;
	mobileAssetContentPath: string;
	mobileGearAssetDataBases: GearAssetDataBaseDefinition[];
	mobileWorldContentPaths: {[field: string]: string};
	mobileClanBannerDatabasePath: string;
	mobileGearCDN: {[field: string]: string};
}

export interface GearAssetDataBaseDefinition {
	version: number;
	path: string;
}
