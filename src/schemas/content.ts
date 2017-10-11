import {GeneralUser} from './user';

export interface ContentItemPublicContract {
	contentId: string;
	cType: string;
	cmsPath: string;
	creationDate: string;
	modifyDate: string;
	allowComments: boolean;
	hasAgeGate: boolean;
	minimumAge: number;
	ratingImagePath: string;
	author: GeneralUser;
	autoEnglishPropertyFallback: boolean;
	/**
	 * Firehose content is really a collection of metadata and "properties", which are the potentially-but-not-strictly localizable data that comprises the meat of whatever content is being shown.
	 * As Cole Porter would have crooned, "Anything Goes" with Firehose properties. They are most often strings, but they can theoretically be anything. They are JSON encoded, and could be JSON structures, simple strings, numbers etc... The Content Type of the item (cType) will describe the properties, and thus how they ought to be deserialized.
	 */
	properties: {[field: string]: any};
	representations: ContentRepresentation[];
	tags: string[];
	commentSummary: CommentSummary;
}

export interface ContentRepresentation {
	name: string;
	path: string;
	validationString: string;
}

export interface CommentSummary {
	topicId: string;
	commentCount: number;
}
