import { useQuery, gql } from '@apollo/client';
import LanguageFragment from '../fragments/LanguageFragment';

export const LanguagesQuery = gql`
  query Languages($offset: Int, $limit: Int, $includeInactive: Boolean) {
    languages(
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
  limit = 20,
  offset = 0,
  includeInactive = false,
} = {}) => {
  const { data, loading, error } = useQuery(LanguagesQuery, {
    variables: { limit, offset, includeInactive },
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
