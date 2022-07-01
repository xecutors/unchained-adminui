import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';

import AssortmentFragment from '../fragments/AssortmentFragment';

export const AssortmentsQuery = gql`
  query Assortments(
    $queryString: String
    $tags: [String!]
    $slugs: [String!]
    $limit: Int
    $offset: Int
    $includeInactive: Boolean
    $includeLeaves: Boolean
    $sort: [SortOptionInput!]
    $forceLocale: String
  ) {
    assortments(
      queryString: $queryString
      tags: $tags
      slugs: $slugs
      limit: $limit
      offset: $offset
      includeInactive: $includeInactive
      includeLeaves: $includeLeaves
      sort: $sort
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
  queryString = '',
  tags = null,
  slugs = null,
  limit = 20,
  offset = 0,
  includeInactive = false,
  includeLeaves = false,
  sort: sortOptions = [],
} = {}) => {
  const { locale } = useIntl();

  const { data, loading, error, fetchMore } = useQuery(AssortmentsQuery, {
    variables: {
      queryString,
      tags,
      slugs: slugs || null,
      limit,
      offset,
      includeInactive,
      includeLeaves,
<<<<<<< HEAD
      sort: sortOptions.length
        ? sortOptions
        : [{ key: 'sequence', value: 'ASC' }],
=======
      sort: [{ key: 'sequence', value: 'ASC' }],
>>>>>>> 89c5330a (force localiziation)
      forceLocale: locale,
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
