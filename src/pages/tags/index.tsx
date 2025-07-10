import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import ListHeader from '../../modules/common/components/ListHeader';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import TagList from '../../modules/tags/components/TagList';
import useTags from '../../modules/tags/hooks/useTags';
import useAuth from '../../modules/Auth/useAuth';
import {
  convertSortFieldsToQueryFormat,
  normalizeQuery,
} from '../../modules/common/utils/utils';
import SearchWithTags from '../../modules/common/components/SearchWithTags';
import TagDetailPage from './TagDetailPage';
import AnimatedCounter from '../../modules/common/components/AnimatedCounter';
import InfiniteScroll from '../../modules/common/components/InfiniteScroll';
import Loading from '../../modules/common/components/Loading';

const Tags = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();
  const { hasRole } = useAuth();
  const limit = parseInt(query?.limit as string, 10) || DefaultLimit;
  const offset = parseInt(query?.skip as string, 10) || 0;
  const sort = query?.sort || '';

  const { queryString, tagId, ...restQuery } = query;

  const setQueryString = (searchString) => {
    const { skip, ...withoutSkip } = restQuery;
    if (searchString) {
      push({
        query: normalizeQuery(withoutSkip, searchString, 'queryString'),
      });
    } else {
      push({
        query: normalizeQuery(restQuery),
      });
    }
  };
  const sortKeys = convertSortFieldsToQueryFormat(sort);

  const { tags, tagsCount, loading, loadMore, hasMore } = useTags({
    queryString: queryString as string,
    limit,
    offset,
    sort: sortKeys,
  });

  if (tagId) return <TagDetailPage tagId={tagId} />;
  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage(
          (tagsCount ?? 0) === 1
            ? {
                id: 'tag_count_header_singular',
                defaultMessage: '1 Tag',
              }
            : {
                id: 'tags_count_header',
                defaultMessage: '{count} Tags',
              },
          { count: <AnimatedCounter value={tagsCount ?? 0} /> },
        )}
        addPath={hasRole('manageTags') && '/tags/new'}
        addButtonText={formatMessage({
          id: 'add_tag',
          defaultMessage: 'Add Tag',
        })}
      />
      <div className="min-w-full overflow-x-auto px-1">
        <ListHeader>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {formatMessage({
              id: 'tags_management_description',
              defaultMessage: 'Manage tags used across products, assortments, and other content',
            })}
          </div>
        </ListHeader>

        <SearchWithTags
          onSearchChange={setQueryString}
          defaultSearchValue={queryString}
        >
          <InfiniteScroll
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMore}
          >
            {loading && tags?.length === 0 ? (
              <Loading />
            ) : (
              <TagList
                tags={tags}
                sortable
              />
            )}
          </InfiniteScroll>
        </SearchWithTags>
      </div>
    </>
  );
};

export default Tags;