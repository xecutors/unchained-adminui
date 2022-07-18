import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';
import AssortmentFragment from '../fragments/AssortmentFragment';

export const SearchAssortmentsQuery = gql`
  query SearchAssortments(
    $queryString: String
    $offset: Int
    $limit: Int
    $forceLocale: String
  ) {
    searchAssortments(queryString: $queryString, includeInactive: true) {
      assortments(limit: $limit, offset: $offset) {
        ...AssortmentFragment
      }
    }
  }
  ${AssortmentFragment}
`;

const useSearchAssortments = ({
  queryString = '',
  limit = 20,
  offset = 0,
} = {}) => {
  const { locale } = useIntl();
  const { data, loading, error } = useQuery(SearchAssortmentsQuery, {
    skip: !queryString,
    variables: {
      limit,
      offset,
      queryString,
      forceLocale: locale,
    },
  });
  const searchAssortments = data?.searchAssortments || {};
  const assortments = searchAssortments?.assortments || [];

  return {
    assortments,

    loading,
    error,
  };
};

export default useSearchAssortments;
