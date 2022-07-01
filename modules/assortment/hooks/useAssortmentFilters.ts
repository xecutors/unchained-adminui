import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';
import FilterFragment from '../../filter/fragments/FilterFragment';

export const AssortmentFiltersQuery = gql`
  query AssortmentFilters(
    $assortmentId: ID
    $slug: String
    $forceLocale: String
  ) {
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

const useAssortmentFilters = ({ assortmentId = null, slug = null } = {}) => {
  const { locale } = useIntl();

  const { data, loading, error } = useQuery(AssortmentFiltersQuery, {
    skip: !assortmentId && !slug,
    variables: {
      slug,
      assortmentId,
      forceLocale: locale,
    },
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
