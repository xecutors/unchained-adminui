import { useQuery, gql } from '@apollo/client';

import AssortmentFragment from '../fragments/AssortmentFragment';

export const AssortmentsQuery = gql`
  query Assortments(
    $tags: [String!]
    $slugs: [String!]
    $limit: Int
    $offset: Int
    $includeInactive: Boolean
    $includeLeaves: Boolean
  ) {
    assortments(
      tags: $tags
      slugs: $slugs
      limit: $limit
      offset: $offset
      includeInactive: $includeInactive
      includeLeaves: $includeLeaves
      queryString: $queryString
    ) {
      ...AssortmentFragment
    }
    assortmentsCount(
      tags: $tags
      slugs: $slugs
      includeInactive: $includeInactive
      includeLeaves: $includeLeaves
    )
  }
  ${AssortmentFragment}
`;

const useAssortments = ({
  tags = null,
  slugs = null,
  limit = 20,
  offset = 0,
  includeInactive = false,
  includeLeaves = false,
  queryString = '',
} = {}) => {
  const { data, loading, error, fetchMore } = useQuery(AssortmentsQuery, {
    variables: {
      tags,
      slugs,
      limit,
      offset,
      includeInactive,
      includeLeaves,
      queryString,
    },
  });
  const assortments = data?.assortments || [];
  const assortmentsCount = data?.assortmentsCount;
  const hasMore = assortments?.length < assortmentsCount;

  const loadMore = () =>
    fetchMore({
      variables: { offset: assortments?.length },
    });

  return {
    loading,
    error,
    loadMore,
    assortmentsCount,
    hasMore,
    assortments: data?.assortments || [],
  };
};

export default useAssortments;
