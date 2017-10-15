import {DestinyActivityHistoryResults, DestinyAggregateActivityResults, DestinyHistoricalStatsAccountResult, DestinyHistoricalStatsByPeriod, DestinyHistoricalWeaponStatsData, DestinyLeaderboard, DestinyPostGameCarnageReportData} from '../../schemas/destiny/historical-stats';
import {PlatformErrorCodes} from '../../schemas/exceptions';

export interface DestinyPostGameCarnageReportData {
	Response: DestinyPostGameCarnageReportData;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface DestinyLeaderboardResults {
	Response: {[field: string]: {[field: string]: DestinyLeaderboard}};
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface DestinyHistoricalStatsResults {
	Response: {[field: string]: DestinyHistoricalStatsByPeriod};
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface DestinyHistoricalStatsAccountResult {
	Response: DestinyHistoricalStatsAccountResult;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface DestinyActivityHistoryResults {
	Response: DestinyActivityHistoryResults;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface DestinyHistoricalWeaponStatsData {
	Response: DestinyHistoricalWeaponStatsData;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface DestinyAggregateActivityResults {
	Response: DestinyAggregateActivityResults;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}
