import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import InfiniteScroll from '../../modules/common/components/InfiniteScroll';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import EnrollmentList from '../../modules/enrollment/components/EnrollmentList';
import useEnrollments from '../../modules/enrollment/hooks/useEnrollments';
import SearchField from '../../modules/common/components/SearchField';
import {
  convertSortFieldsToQueryFormat,
  normalizeQuery,
} from '../../modules/common/utils/utils';

import useEnrollmentStatusTypes from '../../modules/enrollment/hooks/useEnrollmentStatusTypes';
import StatusFilter from '../../modules/common/components/StatusFilter';
import LocaleWrapper from '../../modules/common/components/LocaleWrapper';
import EnrollmentDetailPage from './EnrollmentDetailPage';

const EnrollmentListView = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();
  const limit = parseInt(query?.limit as string, 10) || DefaultLimit;
  const offset = parseInt(query?.skip as string, 10) || 0;
  const sort = query?.sort || '';

  const { queryString, enrollmentId, ...restQuery } = query;

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

  const { enrollments, enrollmentsCount, loading, loadMore, hasMore } = useEnrollments({
    queryString: queryString as string,
    limit,
    offset,
    sort: sortKeys,
    status: (query?.status as string)?.split(','),
  });

  const { enrollmentStatusTypes } = useEnrollmentStatusTypes();

  const ENROLLMENT_STATUS =
    enrollmentStatusTypes?.map(({ value }) => value) || [];

  const onStatusChange = (currentStatuses) => {
    const { status, ...rest } = query;
    if (currentStatuses?.length)
      push({
        query: normalizeQuery(rest, currentStatuses, 'status'),
      });
    else
      push({
        query: rest,
      });
  };

  if (enrollmentId) return <EnrollmentDetailPage enrollmentId={enrollmentId} />;
  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage(
          (enrollmentsCount ?? 0) === 1
            ? {
                id: 'enrollment_count_header_singular',
                defaultMessage: '1 Enrollment',
              }
            : {
                id: 'enrollments_count_header',
                defaultMessage: '{count} Enrollments',
              },
          { count: enrollmentsCount ?? 0 },
        )}
      />
      <div>
        <p className="mt-5 text-md font-medium leading-5 text-slate-800 dark:text-slate-200 lg:gap-7 lg:leading-6 ">
          {formatMessage({ id: 'status', defaultMessage: 'Status' })}
        </p>
        <div className="mt-2 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:pr-5">
          <StatusFilter
            statuses={ENROLLMENT_STATUS}
            onStatusChange={onStatusChange}
            selectedStatuses={query?.status}
          />
        </div>
      </div>
      <div className="min-w-full overflow-x-auto">
        <ListHeader />

        <LocaleWrapper
          searchComponent={
            <SearchField
              defaultValue={queryString}
              onInputChange={setQueryString}
            />
          }
        >
          <InfiniteScroll
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMore}
          >
            {loading && enrollments?.length === 0 ? (
              <Loading />
            ) : (
              <EnrollmentList enrollments={enrollments} showUser sortable />
            )}
          </InfiniteScroll>
        </LocaleWrapper>
      </div>
    </>
  );
};

export default EnrollmentListView;
