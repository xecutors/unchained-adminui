import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import ListPagination from '../../modules/common/components/ListPagination';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import EnrollmentList from '../../modules/enrollment/components/EnrollmentList';
import useEnrollments from '../../modules/enrollment/hooks/useEnrollments';

const index = () => {
  const { formatMessage } = useIntl();
  const [limit, setLimit] = useState(DefaultLimit);
  const [offset, setOffset] = useState(0);
  const onOffsetChange = (value) => {
    setOffset(value);
  };
  const { enrollments, loadMore, enrollmentsCount, loading } = useEnrollments({
    limit,
    offset,
  });
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
        <ListHeader />

        {loading ? (
          <Loading />
        ) : (
          <EnrollmentList enrollments={enrollments} showUser />
        )}

        <ListPagination
          limit={limit}
          onLoadMore={loadMore}
          data={enrollments}
          total={enrollmentsCount}
          onLimitChange={setLimit}
          offset={offset}
          onOffsetChange={onOffsetChange}
        />
      </div>
    </>
  );
};

export default index;
