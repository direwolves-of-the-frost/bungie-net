import {DestinyEquipItemResults} from '../../schemas/destiny';
import {PlatformErrorCodes} from '../../schemas/exceptions';

import * as Config from './config';
export {Config};
import * as Definitions from './definitions';
export {Definitions};
import * as Responses from './responses';
export {Responses};
import * as Milestones from './milestones';
export {Milestones};
import * as HistoricalStats from './historical-stats';
export {HistoricalStats};

export interface DestinyEquipItemResults {
	Response: DestinyEquipItemResults;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}
