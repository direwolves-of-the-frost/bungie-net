import {PlatformErrorCodes} from '../../schemas/exceptions';
import {SaveMessageResult} from '../../schemas/messages/responses';

export interface SaveMessageResult {
	Response: SaveMessageResult;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}
