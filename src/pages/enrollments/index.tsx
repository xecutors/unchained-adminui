import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import Pagination from '../../modules/common/components/Pagination';
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

  const { enrollments, enrollmentsCount, loading } = useEnrollments({
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <PageHeader
          headerText={formatMessage({
            id: 'enrollments_list_header',
            defaultMessage: 'Enrollments',
          })}
        />
        <SearchField
          defaultValue={queryString}
          onInputChange={setQueryString}
        />
      </div>
      <div>
        <p className="mt-0 text-xl font-medium leading-5 text-slate-800 dark:text-slate-200 lg:gap-7 lg:leading-6 ">
          {formatMessage({ id: 'status', defaultMessage: 'Status' })}
        </p>
        <div className="m-1 mt-3 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:pr-5">
          <StatusFilter
            statuses={ENROLLMENT_STATUS}
            onStatusChange={onStatusChange}
            selectedStatuses={query?.status}
          />
        </div>
      </div>
      <div className="min-w-full overflow-x-auto">
        <ListHeader totalRecords={enrollmentsCount} />

        {loading ? (
          <Loading />
        ) : (
          <EnrollmentList enrollments={enrollments} showUser sortable />
        )}
        <Pagination data={enrollments} total={enrollmentsCount} />
      </div>
    </>
  );
};

export default EnrollmentListView;
