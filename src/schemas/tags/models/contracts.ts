import {IgnoreResponse} from '../../ignores';

export interface TagResponse {
	tagText: string;
	ignoreStatus: IgnoreResponse;
}
