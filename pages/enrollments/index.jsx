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
import { getSortKeys } from '../../modules/common/utils/utils';

const EnrollmentListView = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();
  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;
  const sort = query?.sort || '';

  const { queryString, ...restQuery } = query;

  const setQueryString = (searchString) => {
    if (searchString)
      push({
        query: {
          ...restQuery,
          queryString: searchString,
        },
      });
    else
      push({
        query: {
          ...restQuery,
        },
      });
  };

  const sortKeys = getSortKeys(sort);

  const { enrollments, enrollmentsCount, loading } = useEnrollments({
    queryString,
    limit,
    offset,
    sort: sortKeys,
  });

  const sortFields = {
    enrollmentNumber: formatMessage({
      id: 'enrollment_number',
      defaultMessage: 'Enrollment number',
    }),
    created: formatMessage({
      id: 'created',
      defaultMessage: 'Created',
    }),
    expires: formatMessage({
      id: 'expires',
      defaultMessage: 'Expires',
    }),
    status: formatMessage({
      id: 'status',
      defaultMessage: 'Status',
    }),
    updated: formatMessage({
      id: 'updated',
      defaultMessage: 'Updated',
    }),
  };

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
      <div className="min-w-full overflow-x-auto">
        <ListHeader sortFields={sortFields} />

        {loading ? (
          <Loading />
        ) : (
          <EnrollmentList enrollments={enrollments} showUser />
        )}
        <Pagination data={enrollments} total={enrollmentsCount} />
      </div>
    </>
  );
};

export default EnrollmentListView;
