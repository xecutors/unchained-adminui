import { useQuery, gql } from '@apollo/client';
import LanguageFragment from '../fragments/LanguageFragment';

export const LanguageQuery = gql`
  query Languages($offset: Int, $limit: Int, $includeInactive: Boolean) {
    languages(
      offset: $offset
      limit: $limit
      includeInactive: $includeInactive
    ) {
      ...LanguageFragment
    }
  }
  ${LanguageFragment}
`;

const useLanguages = ({
  limit = 20,
  offset = 0,
  includeInactive = true,
} = {}) => {
  const { data, loading, error, fetchMore } = useQuery(LanguageQuery, {
    variables: { limit, offset, includeInactive },
  });
  const languages = data?.languages || [];
  const loadMore = () => fetchMore({ variables: { offset: languages.length } });

  return {
    languages,
    loading,
    error,
    loadMore,
  };
};

export default useLanguages;
