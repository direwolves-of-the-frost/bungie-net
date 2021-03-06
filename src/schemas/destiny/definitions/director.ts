import {ActivityGraphNodeHighlightType} from '../';
import {DestinyUnlockExpressionDefinition} from './';
import {DestinyDisplayPropertiesDefinition, DestinyPositionDefinition} from './common';

/**
 * Represents a Map View in the director: be them overview views, destination views, or other.
 * They have nodes which map to activities, and other various visual elements that we (or others) may or may not be able to use.
 * Activity graphs, most importantly, have nodes which can have activities in various states of playability.
 * Unfortunately, activity graphs are combined at runtime with Game UI-only assets such as fragments of map images, various in-game special effects, decals etc... that we don't get in these definitions.
 * If we end up having time, we may end up trying to manually populate those here: but the last time we tried that, before the lead-up to D1, it proved to be unmaintainable as the game's content changed. So don't bet the farm on us providing that content in this definition.
 */
export interface DestinyActivityGraphDefinition {
	/**
	 * These represent the visual "nodes" on the map's view. These are the activities you can click on in the map.
	 */
	nodes: DestinyActivityGraphNodeDefinition[];
	/**
	 * Represents one-off/special UI elements that appear on the map.
	 */
	artElements: DestinyActivityGraphArtElementDefinition[];
	/**
	 * Represents connections between graph nodes. However, it lacks context that we'd need to make good use of it.
	 */
	connections: DestinyActivityGraphConnectionDefinition[];
	/**
	 * Objectives can display on maps, and this is supposedly metadata for that. I have not had the time to analyze the details of what is useful within however: we could be missing important data to make this work. Expect this property to be expanded on later if possible.
	 */
	displayObjectives: DestinyActivityGraphDisplayObjectiveDefinition[];
	/**
	 * Progressions can also display on maps, but similarly to displayObjectives we appear to lack some required information and context right now. We will have to look into it later and add more data if possible.
	 */
	displayProgressions: DestinyActivityGraphDisplayProgressionDefinition[];
	/**
	 * Represents links between this Activity Graph and other ones.
	 */
	linkedGraphs: DestinyLinkedGraphDefinition[];
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

/**
 * This is the position and other data related to nodes in the activity graph that you can click to launch activities. An Activity Graph node will only have one active Activity at a time, which will determine the activity to be launched (and, unless overrideDisplay information is provided, will also determine the tooltip and other UI related to the node)
 */
export interface DestinyActivityGraphNodeDefinition {
	/**
	 * An identifier for the Activity Graph Node, only guaranteed to be unique within its parent Activity Graph.
	 */
	nodeId: number;
	/**
	 * The node *may* have display properties that override the active Activity's display properties.
	 */
	overrideDisplay: DestinyDisplayPropertiesDefinition;
	/**
	 * The position on the map for this node.
	 */
	position: DestinyPositionDefinition;
	/**
	 * The node may have various visual accents placed on it, or styles applied. These are the list of possible styles that the Node can have. The game iterates through each, looking for the first one that passes a check of the required game/character/account state in order to show that style, and then renders the node in that style.
	 */
	featuringStates: DestinyActivityGraphNodeFeaturingStateDefinition[];
	/**
	 * The node may have various possible activities that could be active for it, however only one may be active at a time. See the DestinyActivityGraphNodeActivityDefinition for details.
	 */
	activities: DestinyActivityGraphNodeActivityDefinition[];
}

/**
 * Nodes can have different visual states. This object represents a single visual state ("highlight type") that a node can be in, and the unlock expression condition to determine whether it should be set.
 */
export interface DestinyActivityGraphNodeFeaturingStateDefinition {
	/**
	 * The node can be highlighted in a variety of ways - the game iterates through these and finds the first FeaturingState that is valid at the present moment given the Game, Account, and Character state, and renders the node in that state. See the ActivityGraphNodeHighlightType enum for possible values.
	 */
	highlightType: ActivityGraphNodeHighlightType;
}

/**
 * The actual activity to be redirected to when you click on the node. Note that a node can have many Activities attached to it: but only one will be active at any given time. The list of Node Activities will be traversed, and the first one found to be active will be displayed. This way, a node can layer multiple variants of an activity on top of each other. For instance, one node can control the weekly Crucible Playlist. There are multiple possible playlists, but only one is active for the week.
 */
export interface DestinyActivityGraphNodeActivityDefinition {
	/**
	 * An identifier for this node activity. It is only guaranteed to be unique within the Activity Graph.
	 */
	nodeActivityId: number;
	/**
	 * The activity that will be activated if the user clicks on this node. Controls all activity-related information displayed on the node if it is active (the text shown in the tooltip etc)
	 */
	activityHash: number;
}

/**
 * These Art Elements are meant to represent one-off visual effects overlaid on the map. Currently, we do not have a pipeline to import the assets for these overlays, so this info exists as a placeholder for when such a pipeline exists (if it ever will)
 */
export interface DestinyActivityGraphArtElementDefinition {
	/**
	 * The position on the map of the art element.
	 */
	position: DestinyPositionDefinition;
}

/**
 * Nodes on a graph can be visually connected: this appears to be the information about which nodes to link. It appears to lack more detailed information, such as the path for that linking.
 */
export interface DestinyActivityGraphConnectionDefinition {
	sourceNodeHash: number;
	destNodeHash: number;
}

/**
 * When a Graph needs to show active Objectives, this defines those objectives as well as an identifier.
 */
export interface DestinyActivityGraphDisplayObjectiveDefinition {
	/**
	 * $NOTE $amola 2017-01-19 This field is apparently something that CUI uses to manually wire up objectives to display info. I am unsure how it works.
	 */
	id: number;
	/**
	 * The objective being shown on the map.
	 */
	objectiveHash: number;
}

/**
 * When a Graph needs to show active Progressions, this defines those objectives as well as an identifier.
 */
export interface DestinyActivityGraphDisplayProgressionDefinition {
	id: number;
	progressionHash: number;
}

/**
 * This describes links between the current graph and others, as well as when that link is relevant.
 */
export interface DestinyLinkedGraphDefinition {
	description: string;
	name: string;
	unlockExpression: DestinyUnlockExpressionDefinition;
	linkedGraphId: number;
	linkedGraphs: DestinyLinkedGraphEntryDefinition[];
	overview: string;
}

export interface DestinyLinkedGraphEntryDefinition {
	activityGraphHash: number;
}
