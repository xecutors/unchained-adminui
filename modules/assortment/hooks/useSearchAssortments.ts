import { useQuery, gql } from '@apollo/client';
import {
  ISearchAssortmentsQuery,
  ISearchAssortmentsQueryVariables,
} from '../../../gql/types';
import AssortmentFragment from '../fragments/AssortmentFragment';

export const SearchAssortmentsQuery = gql`
  query SearchAssortments($queryString: String, $offset: Int, $limit: Int) {
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
}: ISearchAssortmentsQueryVariables = {}) => {
  const { data, loading, error } = useQuery<
    ISearchAssortmentsQuery,
    ISearchAssortmentsQueryVariables
  >(SearchAssortmentsQuery, {
    skip: !queryString,
    variables: {
      limit,
      offset,
      queryString,
    },
  });
  const searchAssortments = data?.searchAssortments;
  const assortments = searchAssortments?.assortments || [];

  return {
    assortments,

    loading,
    error,
  };
};

export default useSearchAssortments;
