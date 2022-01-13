import { useQuery, gql } from '@apollo/client';

export const LanguagesCountQuery = gql`
  query LanguagesCount($includeInactive: Boolean) {
    languagesCount(includeInactive: $includeInactive)
  }
`;

const useLanguagesCount = ({ includeInactive = false } = {}) => {
  const {
    data: { languagesCount },
    loading,
    error,
  } = useQuery(LanguagesCountQuery, {
    variables: { includeInactive },
  });

  return {
    languagesCount,
    loading,
    error,
  };
};

export default useLanguagesCount;
