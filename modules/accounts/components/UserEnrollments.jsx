import { useRouter } from 'next/router';
import SearchField from '../../common/components/SearchField';
import EnrollmentList from '../../enrollment/components/EnrollmentList';
import useUserEnrollments from '../../enrollment/hooks/useUserEnrollments';

const UserEnrollments = ({ _id: userId }) => {
  const { query, push } = useRouter();
  const queryString = query?.queryString || '';

  const setQueryString = (searchString) => {
    if (searchString)
      push({
        query: {
          ...query,
          queryString: searchString,
        },
      });
    else
      push({
        query: {
          ...query,
        },
      });
  };

  const { enrollments } = useUserEnrollments({ userId, queryString });

  return (
    <div className="space-y-4 mt-4">
      <SearchField defaultValue={queryString} onInputChange={setQueryString} />
      <EnrollmentList enrollments={enrollments} />;
    </div>
  );
};

export default UserEnrollments;
