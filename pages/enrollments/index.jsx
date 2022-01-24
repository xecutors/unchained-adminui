import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import ListPagination from '../../modules/common/components/ListPagination';
import PageHeader from '../../modules/common/components/PageHeader';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import EnrollmentList from '../../modules/enrollment/components/EnrollmentList';
import useEnrollments from '../../modules/enrollment/hooks/useEnrollments';

const index = () => {
  const { formatMessage } = useIntl();
  const [limit, setLimit] = useState(DefaultLimit);
  const { showPagination, enrollments, loadMore, enrollmentsCount, loading } =
    useEnrollments({ limit });
  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'enrollments_list_header',
          defaultMessage: 'Enrollments',
        })}
      />
      <div className=" inline-block min-w-full  sm:shadow-lg   shadow overflow-hidden border-b border-gray-200  ">
        <ListHeader addPath="/enrollments/new">
          {/* <Toggle
            toggleText={formatMessage({
              id: 'include_drafts',
              defaultMessage: 'Include drafts',
            })}
            toggleState={includeDrafts}
            onToggle={setIncludeDrafts}
          /> */}
        </ListHeader>

        <EnrollmentList
          isLoading={loading}
          enrollments={enrollments}
          showUser
          showPagination
          onLimitChange={setLimit}
          onLoadMore={loadMore}
          total={enrollmentsCount}
        />

        {showPagination && (
          <ListPagination
            isLoading={loading}
            onLoadMore={loadMore}
            data={enrollments}
            total={enrollmentsCount}
            onLimitChange={setLimit}
          />
        )}
      </div>
    </>
  );
};

export default index;
