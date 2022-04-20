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

const EnrollmentListView = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;

  const { enrollments, enrollmentsCount, loading } = useEnrollments({
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
      <div className="min-w-full overflow-x-auto">
        <ListHeader />

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
