import {DestinyCharacterResponse, DestinyItemResponse, DestinyProfileResponse, DestinyVendorResponse} from '../../schemas/destiny/responses';
import {PlatformErrorCodes} from '../../schemas/exceptions';

export interface DestinyProfileResponse {
	Response: DestinyProfileResponse;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface DestinyCharacterResponse {
	Response: DestinyCharacterResponse;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface DestinyItemResponse {
	Response: DestinyItemResponse;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface DestinyVendorResponse {
	Response: DestinyVendorResponse;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}
