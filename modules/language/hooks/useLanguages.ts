import { useQuery, gql } from '@apollo/client';
import { ILanguagesQuery, ILanguagesQueryVariables } from '../../../gql/types';
import LanguageFragment from '../fragments/LanguageFragment';

const LanguagesQuery = gql`
  query Languages(
    $queryString: String
    $offset: Int
    $limit: Int
    $includeInactive: Boolean
    $sort: [SortOptionInput!]
  ) {
    languages(
      queryString: $queryString
      offset: $offset
      limit: $limit
      includeInactive: $includeInactive
      sort: $sort
    ) {
      ...LanguageFragment
    }
    languagesCount(includeInactive: $includeInactive, queryString: $queryString)
  }
  ${LanguageFragment}
`;

const useLanguages = ({
  queryString = '',
  limit = 20,
  offset = 0,
  includeInactive = true,
  sort = [],
}: ILanguagesQueryVariables = {}) => {
  const { data, loading, error } = useQuery<
    ILanguagesQuery,
    ILanguagesQueryVariables
  >(LanguagesQuery, {
    variables: { queryString, limit, offset, includeInactive, sort },
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
