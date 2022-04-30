import { useQuery, gql } from '@apollo/client';
import LanguageFragment from '../fragments/LanguageFragment';

export const LanguagesQuery = gql`
  query Languages(
    $queryString: String
    $offset: Int
    $limit: Int
    $includeInactive: Boolean
  ) {
    languages(
      queryString: $queryString
      offset: $offset
      limit: $limit
      includeInactive: $includeInactive
    ) {
      ...LanguageFragment
    }
    languagesCount(includeInactive: $includeInactive)
  }
  ${LanguageFragment}
`;

const useLanguages = ({
  queryString = '',
  limit = 20,
  offset = 0,
  includeInactive = false,
} = {}) => {
  const { data, loading, error } = useQuery(LanguagesQuery, {
    variables: { queryString, limit, offset, includeInactive },
  });
  const languages = data?.languages || [];
  const languagesCount = data?.languagesCount;

  return {
    languages,
    languagesCount,
    loading,
    error,
  };
};

export default useLanguages;
