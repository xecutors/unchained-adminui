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

const useLanguages = ({ limit = 20, offset = 0, includeInactive = true }) => {
  const {
    data: { languages },
    loading,
    error,
  } = useQuery(LanguageQuery, {
    variables: { limit, offset, includeInactive },
  });

  return {
    languages,
    loading,
    error,
  };
};

export default useLanguages;
