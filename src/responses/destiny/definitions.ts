import {DestinyDefinition, DestinyEntitySearchResult} from '../../schemas/destiny/definitions';
import {PlatformErrorCodes} from '../../schemas/exceptions';

export interface DestinyDefinition {
	Response: DestinyDefinition;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface DestinyEntitySearchResult {
	Response: DestinyEntitySearchResult;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}
