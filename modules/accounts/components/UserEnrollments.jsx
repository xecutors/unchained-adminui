import EnrollmentList from '../../enrollment/components/EnrollmentList';
import useUserEnrollments from '../../enrollment/hooks/useUserEnrollments';

const UserEnrollments = ({ _id: userId }) => {
  const { enrollments } = useUserEnrollments({ userId });
  return <EnrollmentList enrollments={enrollments} />;
};

export default UserEnrollments;
