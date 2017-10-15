import {DestinyMilestone, DestinyMilestoneContent} from '../../schemas/destiny/milestones';
import {PlatformErrorCodes} from '../../schemas/exceptions';

export interface DestinyMilestone {
	Response: DestinyMilestone;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface DestinyMilestoneContent {
	Response: DestinyMilestoneContent;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}
