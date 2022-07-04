import { useQuery, gql } from '@apollo/client';
import QuotationFragment from '../fragments/QuotationFragment';

export const QuotationsQuery = gql`
  query Quotations(
    $limit: Int
    $offset: Int
    $queryString: String
    $sort: [SortOptionInput!]
  ) {
    quotations(
      limit: $limit
      offset: $offset
      queryString: $queryString
      sort: $sort
    ) {
      ...QuotationFragment
    }
    quotationsCount
  }
  ${QuotationFragment}
`;

const useQuotations = ({
  limit = 20,
  offset = 0,
  queryString = '',
  sort = [],
} = {}) => {
  const { data, loading, error, fetchMore } = useQuery(QuotationsQuery, {
    variables: { limit, offset, queryString, sort },
  });
  const quotations = data?.quotations || [];
  const quotationsCount = data?.quotationsCount;
  const hasMore = quotations?.length < quotationsCount;
  const loadMore = () => {
    fetchMore({
      variables: { offset: quotations.length },
    });
  };

  return {
    quotations,
    quotationsCount,
    hasMore,
    loading,
    error,
    loadMore,
  };
};

export default useQuotations;
