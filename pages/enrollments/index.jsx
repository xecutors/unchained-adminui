import EnrollmentList from '../../modules/enrollment/components/EnrollmentList';
import useEnrollments from '../../modules/enrollment/hooks/useEnrollments';

const index = () => {
  const { enrollments } = useEnrollments();
  return (
    <div>
      <EnrollmentList enrollments={enrollments} showUser />
    </div>
  );
};

export default index;
