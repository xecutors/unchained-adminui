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
  includeInactive = true,
} = {}) => {
  const { data, loading, error, fetchMore } = useQuery(LanguagesQuery, {
    variables: { limit, offset, includeInactive },
  });
  const languages = data?.languages || [];
  const languagesCount = data?.languagesCount;
  const hasMore = languages?.length < languagesCount;
  const loadMore = () => {
    fetchMore({
      variables: { offset: languages.length },
    });
  };

  return {
    languages,
    languagesCount,
    hasMore,
    loading,
    error,
    loadMore,
  };
};

export default useLanguages;
