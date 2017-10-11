import {PlatformErrorCodes} from './exceptions';

export interface EntityActionResult {
	entityId: string;
	result: PlatformErrorCodes;
}
