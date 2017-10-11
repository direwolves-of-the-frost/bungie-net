import {DyeReference} from './';

/**
 * Raw data about the customization options chosen for a character's face and appearance.
 * You can look up the relevant class/race/gender combo in DestinyCharacterCustomizationOptionDefinition for the character, and then look up these values within the CustomizationOptions found to pull some data about their choices. Warning: not all of that data is meaningful. Some data has useful icons. Others have nothing, and are only meant for 3D rendering purposes (which we sadly do not expose yet)
 */
export interface DestinyCharacterCustomization {
	personality: number;
	face: number;
	skinColor: number;
	lipColor: number;
	eyeColor: number;
	hairColors: number[];
	featureColors: number[];
	decalColor: number;
	wearHelmet: boolean;
	hairIndex: number;
	featureIndex: number;
	decalIndex: number;
}

/**
 * A minimal view of a character's equipped items, for the purpose of rendering a summary screen or showing the character in 3D.
 */
export interface DestinyCharacterPeerView {
	equipment: DestinyItemPeerView[];
}

/**
 * Bare minimum summary information for an item, for the sake of 3D rendering the item.
 */
export interface DestinyItemPeerView {
	/**
	 * The hash identifier of the item in question. Use it to look up the DestinyInventoryItemDefinition of the item for static rendering data.
	 */
	itemHash: number;
	/**
	 * The list of dyes that have been applied to this item.
	 */
	dyes: DyeReference[];
}
