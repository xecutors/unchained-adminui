import { useQuery, gql } from '@apollo/client';

const DEFAULT_LIMIT = 50;

const ProductFragment = `
  fragment SyncReportItem on SyncReportProduct {
    _id
    title
    subtitle
    slug
  }
`;

const FilterFragment = `
  fragment SyncReportItem on SyncReportFilter {
    _id
    key
    type
    title
    subtitle
  }
`;

const AssortmentFragment = `
  fragment SyncReportItem on SyncReportAssortment {
    _id
    title
    subtitle
    slug
  }
`;

const queryFragments = {
  newAssortments: AssortmentFragment,
  updatedAssortments: AssortmentFragment,
  removedAssortments: AssortmentFragment,
  newProducts: ProductFragment,
  updatedProducts: ProductFragment,
  removedProducts: ProductFragment,
  newFilters: FilterFragment,
  updatedFilters: FilterFragment,
  removedFilters: FilterFragment,
};

const useDailySyncItems = ({ workId, itemKey, searchQuery }) => {
  const { data, loading, error, fetchMore } = useQuery(
    gql`
      query PublicareSyncReportItems(
        $workId: ID!
        $offset: Int
        $limit: Int
        $searchQuery: String
      ) {
        publicareSyncReportItems(workId: $workId) {
          ${itemKey}(
            offset: $offset
            limit: $limit
            searchQuery: $searchQuery
          ) {
            _id
            ...SyncReportItem
          }
        }
      }
      ${queryFragments[itemKey]}
    `,
    {
      variables: {
        workId,
        searchQuery,
        limit: DEFAULT_LIMIT,
      },
    },
  );

  const items = data?.publicareSyncReportItems?.[itemKey] || [];

  const loadMore = () =>
    fetchMore({
      variables: { offset: items?.length },
    });

  return {
    loading,
    loadMore,
    error,
    items,
  };
};

export default useDailySyncItems;
