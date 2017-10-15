import {PlatformErrorCodes} from '../schemas/exceptions';
import {TrendingCategories, TrendingDetail} from '../schemas/trending';

export interface TrendingCategories {
	Response: TrendingCategories;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface TrendingDetail {
	Response: TrendingDetail;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}
