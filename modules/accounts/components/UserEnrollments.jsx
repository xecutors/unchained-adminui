import EnrollmentList from '../../enrollment/components/EnrollmentList';
import useUserEnrollments from '../../enrollment/hooks/useUserEnrollments';

const UserEnrollments = ({ _id: userId }) => {
  const { enrollments } = useUserEnrollments({ userId });
  return (
    <div className="m-5 flex flex-col">
      <EnrollmentList enrollments={enrollments} />
    </div>
  );
};

export default UserEnrollments;
