/**
 * Many Destiny*Definition contracts - the "first order" entities of Destiny that have their own tables in the Manifest Database - also have displayable information. This is the base class for that display information.
 */
export interface DestinyDisplayPropertiesDefinition {
	description: string;
	name: string;
	/**
	 * Note that "icon" is sometimes misleading, and should be interpreted in the context of the entity. For instance, in Destiny 1 the DestinyRecordBookDefinition's icon was a big picture of a book.
	 * But usually, it will be a small square image that you can use as... well, an icon.
	 */
	icon: string;
	hasIcon: boolean;
}

export interface DestinyPositionDefinition {
	x: number;
	y: number;
	z: number;
}
