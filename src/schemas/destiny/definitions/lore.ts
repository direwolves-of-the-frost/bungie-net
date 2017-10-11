import {DestinyDisplayPropertiesDefinition} from './common';

/**
 * These are definitions for in-game "Lore," meant to be narrative enhancements of the game experience.
 * DestinyInventoryItemDefinitions for interesting items point to these definitions, but nothing's stopping you from scraping all of these and doing something cool with them. If they end up having cool data.
 */
export interface DestinyLoreDefinition {
	displayProperties: DestinyDisplayPropertiesDefinition;
	subtitle: string;
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
