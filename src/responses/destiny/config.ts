import {DestinyManifest} from '../../schemas/destiny/config';
import {PlatformErrorCodes} from '../../schemas/exceptions';

export interface DestinyManifest {
	Response: DestinyManifest;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}
