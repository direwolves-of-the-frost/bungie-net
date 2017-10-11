import {DestinyDisplayPropertiesDefinition} from './common';

/**
 * Modifiers - in Destiny 1, these were referred to as "Skulls" - are changes that can be applied to an Activity.
 */
export interface DestinyActivityModifierDefinition {
	displayProperties: DestinyDisplayPropertiesDefinition;
	/**
	 * The unique identifier for this entity. Guaranteed to be unique for the type of entity, but not globally.
	 * When entities refer to each other in Destiny content, it is this hash that they are referring to.
	 */
	hash: number;
	/**
	 * The index of the entity as it was found in the investment tables.
	 */
	index: number;
	/**
	 * If this is true, then there is an entity with this identifier/type combination, but BNet is not yet allowed to show it. Sorry!
	 */
	redacted: boolean;
}
