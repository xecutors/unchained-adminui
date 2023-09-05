import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { IEnrollment } from '../../gql/types';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import EnrollmentDetail from '../../modules/enrollment/components/EnrollmentDetail';
import useEnrollment from '../../modules/enrollment/hooks/useEnrollment';

const EnrollmentDetailPage = () => {
  const { formatMessage } = useIntl();

  const { query } = useRouter();
  const { enrollmentId } = query;
  const { enrollment, loading } = useEnrollment({
    enrollmentId: enrollmentId as string,
  });

  return (
    <div className="mt-6 max-w-full">
      <BreadCrumbs
        currentPageTitle={
          enrollment?.enrollmentNumber ? `#${enrollment?.enrollmentNumber}` : ''
        }
      />
      <div className="align-center flex min-w-full justify-between">
        <PageHeader
          headerText={formatMessage({
            id: 'enrollment_detail',
            defaultMessage: 'Enrollment Detail',
          })}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <EnrollmentDetail enrollment={enrollment as IEnrollment} />
      )}
    </div>
  );
};

export default EnrollmentDetailPage;
