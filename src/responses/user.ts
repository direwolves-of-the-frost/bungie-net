import {PlatformErrorCodes} from '../schemas/exceptions';
import {GeneralUser, UserMembershipData} from '../schemas/user';

export interface GeneralUser {
	Response: GeneralUser;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface UserMembershipData {
	Response: UserMembershipData;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}
