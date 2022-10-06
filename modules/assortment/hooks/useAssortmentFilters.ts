import { useQuery, gql } from '@apollo/client';
import { parseUniqueId } from '../../common/utils/getUniqueId';
import FilterFragment from '../../filter/fragments/FilterFragment';

export const AssortmentFiltersQuery = gql`
  query AssortmentFilters($assortmentId: ID, $slug: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      _id
      filterAssignments {
        _id
        sortKey
        tags
        filter {
          ...FilterFragment
        }
      }
    }
  }
  ${FilterFragment}
`;

const useAssortmentFilters = ({
  assortmentId: id = null,
  slug = null,
} = {}) => {
  const parsedId = parseUniqueId(slug);
  const { data, loading, error } = useQuery(AssortmentFiltersQuery, {
    skip: !id && !parsedId,
    variables: {
      assortmentId: id || parsedId,
    },
    fetchPolicy: 'cache-first',
  });

  const assortment = data?.assortment || {};
  const assortmentFilters = assortment?.filterAssignments || [];
  return {
    loading,
    error,
    assortmentFilters,
  };
};

export default useAssortmentFilters;
