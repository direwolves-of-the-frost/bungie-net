import {CommunityLiveStatus} from '../schemas/community';
import {PlatformErrorCodes} from '../schemas/exceptions';

export interface CommunityLiveStatus {
	Response: CommunityLiveStatus;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}
