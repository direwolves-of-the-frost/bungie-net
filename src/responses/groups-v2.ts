import {PlatformErrorCodes} from '../schemas/exceptions';
import {GroupApplicationResponse, GroupCreationResponse, GroupMemberLeaveResult, GroupMembershipSearchResponse, GroupPotentialMembershipSearchResponse, GroupResponse, GroupSearchResponse} from '../schemas/groups-v2';

export interface GroupSearchResponse {
	Response: GroupSearchResponse;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface GroupResponse {
	Response: GroupResponse;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface GroupCreationResponse {
	Response: GroupCreationResponse;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface GroupMemberLeaveResult {
	Response: GroupMemberLeaveResult;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface GroupApplicationResponse {
	Response: GroupApplicationResponse;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface GroupMembershipSearchResponse {
	Response: GroupMembershipSearchResponse;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface GroupPotentialMembershipSearchResponse {
	Response: GroupPotentialMembershipSearchResponse;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}
