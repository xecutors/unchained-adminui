import { useQuery, gql } from '@apollo/client';
import FilterFragment from '../../filter/fragments/FilterFragment';

export const AssortmentFiltersQuery = gql`
  query AssortmentFilters($assortmentId: ID, $slug: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      _id
      filterAssignments {
        ...FilterFragment
      }
    }
  }
  ${FilterFragment}
`;

const useAssortmentFilters = ({ assortmentId = null, slug = null } = {}) => {
  const { data, loading, error } = useQuery(AssortmentFiltersQuery, {
    variables: {
      slug,
      assortmentId,
    },
  });

  return {
    loading,
    error,
    assortments: data?.assortment,
  };
};

export default useAssortmentFilters;
