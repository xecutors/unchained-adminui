import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import EnrollmentDetail from '../../modules/enrollment/components/EnrollmentDetail';
import useEnrollment from '../../modules/enrollment/hooks/useEnrollment';

const EnrollmentDetailPage = () => {
  const { formatMessage } = useIntl();

  const { query } = useRouter();
  const { enrollmentId } = query;
  const { enrollment, loading } = useEnrollment({ enrollmentId });

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

      {/* TODO change mock props data */}
      {loading ? <Loading /> : <EnrollmentDetail enrollment={enrollment} />}
    </div>
  );
};

export default EnrollmentDetailPage;
