/**
 * The base class for any component-returning object that may need to indicate information about the state of the component being returned.
 */
export interface ComponentResponse {
	privacy: ComponentPrivacySetting;
}

/**
 * A set of flags for reason(s) why the component populated in the way that it did. Inspect the individual flags for the reasons.
 */
export enum ComponentPrivacySetting {
	None = 0,
	Public = 1,
	Private = 2,
}
