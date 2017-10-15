import {PlatformErrorCodes} from '../schemas/exceptions';
import {ForumRecruitmentDetail, PostSearchResponse} from '../schemas/forum';

export interface PostSearchResponse {
	Response: PostSearchResponse;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface ForumRecruitmentDetail {
	Response: ForumRecruitmentDetail;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}
