/**
 * Plugs are non-instanced items that can provide Stat and Perk benefits when socketed into an instanced item. Items have Sockets, and Plugs are inserted into Sockets.
 * This component finds all items that are considered "Plugs" in your inventory, and return information about the plug aside from any specific Socket into which it could be inserted.
 */
export interface DestinyItemPlugComponent {
	/**
	 * If the plug cannot be inserted for some reason, this will have the indexes into the plug item definition's plug.insertionRules property, so you can show the reasons why it can't be inserted.
	 * This list will be empty if the plug can be inserted.
	 */
	insertFailIndexes: number[];
	/**
	 * If a plug is not enabled, this will be populated with indexes into the plug item definition's plug.enabledRules property, so that you can show the reasons why it is not enabled.
	 * This list will be empty if the plug is enabled.
	 */
	enableFailIndexes: number[];
}
