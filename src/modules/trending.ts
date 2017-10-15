import {Module} from '../module';
import {SearchResultOfTrendingEntry} from '../responses';
import {TrendingCategories, TrendingDetail} from '../responses/trending';
import {TrendingEntryType} from '../schemas/trending';

export class Trending extends Module {
	/**
	 * Returns trending items for Bungie.net, collapsed into the first page of items per category. For pagination within a category, call GetTrendingCategory.
	 *
	 * @returns {Promise<TrendingCategories>}
	 * @memberof Trending
	 */
	public GetTrendingCategories(): Promise<TrendingCategories> {
		return this.client.get(`Trending/Categories`);
	}

	/**
	 * Returns paginated lists of trending items for a category.
	 *
	 * @param {string} categoryId
	 * @param {number} pageNumber
	 * @returns {Promise<SearchResultOfTrendingEntry>}
	 * @memberof Trending
	 */
	public GetTrendingCategory(categoryId: string, pageNumber: number): Promise<SearchResultOfTrendingEntry> {
		return this.client.get(`Trending/Categories/${categoryId}/${pageNumber}`);
	}

	/**
	 * Returns the detailed results for a specific trending entry. Note that trending entries are uniquely identified by a combination of *both* the TrendingEntryType *and* the identifier: the identifier alone is not guaranteed to be globally unique.
	 *
	 * @param {string} identifier
	 * @param {TrendingEntryType} trendingEntryType
	 * @returns {Promise<TrendingDetail>}
	 * @memberof Trending
	 */
	public GetTrendingEntryDetail(identifier: string, trendingEntryType: TrendingEntryType): Promise<TrendingDetail> {
		return this.client.get(`Trending/Details/${trendingEntryType}/${identifier}`);
	}
}
