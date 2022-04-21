import { useQuery, gql } from '@apollo/client';
import AssortmentChildrenFragment from '../fragments/AssortmentChildrenFragment';

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
    ) {
      ...AssortmentChildrenFragment
      children {
        ...AssortmentChildrenFragment
        children {
          ...AssortmentChildrenFragment
          children {
            ...AssortmentChildrenFragment
          }
        }
      }
    }
    assortmentsCount(
      tags: $tags
      slugs: $slugs
      includeInactive: $includeInactive
      includeLeaves: $includeLeaves
    )
  }
  ${AssortmentChildrenFragment}
`;

const useAssortments = ({
  tags = null,
  slugs = null,
  limit = 20,
  offset = 0,
  includeInactive = false,
  includeLeaves = false,
} = {}) => {
  const { data, loading, error, fetchMore } = useQuery(AssortmentsQuery, {
    variables: {
      tags,
      slugs,
      limit,
      offset,
      includeInactive,
      includeLeaves,
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
