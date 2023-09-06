import { useQuery, gql } from '@apollo/client';
import {
  IQuotationsQuery,
  IQuotationsQueryVariables,
} from '../../../gql/types';
import QuotationFragment from '../fragments/QuotationFragment';

const QuotationsQuery = gql`
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
}: IQuotationsQueryVariables = {}) => {
  const { data, loading, error } = useQuery<
    IQuotationsQuery,
    IQuotationsQueryVariables
  >(QuotationsQuery, {
    variables: { limit, offset, queryString, sort },
  });
  const quotations = data?.quotations || [];
  const quotationsCount = data?.quotationsCount;
  const hasMore = quotations?.length < quotationsCount;

  return {
    quotations,
    quotationsCount,
    hasMore,
    loading,
    error,
  };
};

export default useQuotations;
