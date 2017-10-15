import {SearchResultOfCommunityLiveStatus, SearchResultOfGroupBan, SearchResultOfGroupMember, SearchResultOfGroupMemberApplication, SearchResultOfTrendingEntry} from '../schemas';
import {GroupTheme, UserTheme} from '../schemas/config';
import {DestinyClanAggregateStat} from '../schemas/destiny/historical-stats';
import {DestinyHistoricalStatsDefinition} from '../schemas/destiny/historical-stats/definitions';
import {DestinyPublicMilestone} from '../schemas/destiny/milestones';
import {DestinyVendorResponse} from '../schemas/destiny/responses';
import {EntityActionResult} from '../schemas/entities';
import {PlatformErrorCodes} from '../schemas/exceptions';
import {ForumRecruitmentDetail} from '../schemas/forum';
import {GroupOptionalConversation} from '../schemas/groups-v2';
import {PublicPartnershipDetail} from '../schemas/partnerships';
import {TagResponse} from '../schemas/tags/models/contracts';
import {GeneralUser, UserInfoCard} from '../schemas/user';
import {UserAlias} from '../schemas/user/models';

import * as User from './user';
export {User};
import * as Forum from './forum';
export {Forum};
import * as Messages from './messages';
export {Messages};
import * as GroupsV2 from './groups-v2';
export {GroupsV2};
import * as Destiny from './destiny';
export {Destiny};
import * as Community from './community';
export {Community};
import * as Trending from './trending';
export {Trending};

export interface ListOfUserAlias {
	Response: UserAlias[];
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface ListOfGeneralUser {
	Response: GeneralUser[];
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface ListOfUserTheme {
	Response: UserTheme[];
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface CEListOfPublicPartnershipDetail {
	Response: PublicPartnershipDetail[];
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface Int64 {
	Response: string;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface ListOfTagResponse {
	Response: TagResponse[];
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface CEListOfForumRecruitmentDetail {
	Response: ForumRecruitmentDetail[];
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface DictionaryOfint32Andstring {
	Response: {[field: number]: string};
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface ListOfGroupTheme {
	Response: GroupTheme[];
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface Boolean {
	Response: boolean;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface Int32 {
	Response: number;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface CEListOfGroupOptionalConversation {
	Response: GroupOptionalConversation[];
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface SearchResultOfGroupMember {
	Response: SearchResultOfGroupMember;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface SearchResultOfGroupBan {
	Response: SearchResultOfGroupBan;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface SearchResultOfGroupMemberApplication {
	Response: SearchResultOfGroupMemberApplication;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface ListOfEntityActionResult {
	Response: EntityActionResult[];
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface IEnumerableOfUserInfoCard {
	Response: UserInfoCard[];
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface ListOfDestinyVendorResponse {
	Response: DestinyVendorResponse[];
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface ReadOnlyDictionaryOfstringAndDestinyHistoricalStatsDefinition {
	Response: {[field: string]: DestinyHistoricalStatsDefinition};
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface ListOfDestinyClanAggregateStat {
	Response: DestinyClanAggregateStat[];
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface DictionaryOfuint32AndDestinyPublicMilestone {
	Response: {[field: number]: DestinyPublicMilestone};
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface SearchResultOfCommunityLiveStatus {
	Response: SearchResultOfCommunityLiveStatus;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}

export interface SearchResultOfTrendingEntry {
	Response: SearchResultOfTrendingEntry;
	ErrorCode: PlatformErrorCodes;
	ThrottleSeconds: number;
	ErrorStatus: string;
	Message: string;
	MessageData: {[field: string]: string};
}
