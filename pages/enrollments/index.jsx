import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import EnrollmentList from '../../modules/enrollment/components/EnrollmentList';
import useEnrollments from '../../modules/enrollment/hooks/useEnrollments';

const index = () => {
  const { formatMessage } = useIntl();
  const [limit, setLimit] = useState(DefaultLimit);
  const { enrollments, loadMore, enrollmentsCount } = useEnrollments({ limit });
  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'enrollments_list_header',
          defaultMessage: 'Enrollments',
        })}
      />
      <EnrollmentList
        enrollments={enrollments}
        showUser
        onLimitChange={setLimit}
        onLoadMore={loadMore}
        total={enrollmentsCount}
      />
    </>
  );
};

export default index;
