import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';
import ProductBriefFragment from '../../product/fragments/ProductBriefFragment';

export const AssortmentProductsQuery = gql`
  query AssortmentProducts(
    $assortmentId: ID
    $slug: String
    $forceLocale: String
  ) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      _id
      productAssignments {
        _id
        sortKey
        tags
        product {
          ...ProductBriefFragment
        }
      }
    }
  }
  ${ProductBriefFragment}
`;

const useAssortmentProducts = ({ assortmentId = null, slug = null } = {}) => {
  const { locale } = useIntl();

  const { data, loading, error } = useQuery(AssortmentProductsQuery, {
    skip: !assortmentId && !slug,
    variables: {
      slug,
      assortmentId,
      forceLocale: locale,
    },
  });
  const assortment = data?.assortment || {};
  const linkedProducts = assortment?.productAssignments || [];
  return {
    loading,
    error,
    linkedProducts,
  };
};

export default useAssortmentProducts;
