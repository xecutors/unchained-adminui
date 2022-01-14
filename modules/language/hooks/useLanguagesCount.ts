import { useQuery, gql } from '@apollo/client';

export const LanguagesCountQuery = gql`
  query LanguagesCount($includeInactive: Boolean) {
    languagesCount(includeInactive: $includeInactive)
  }
`;

const useLanguagesCount = ({ includeInactive = false } = {}) => {
  const { data, loading, error } = useQuery(LanguagesCountQuery, {
    variables: { includeInactive },
  });

  return {
    languagesCount: data?.languagesCount,
    loading,
    error,
  };
};

export default useLanguagesCount;
