import { useQuery, gql } from '@apollo/client';
import ProductBriefFragment from '../../product/fragments/ProductBriefFragment';

export const AssortmentProductsQuery = gql`
  query AssortmentProducts($assortmentId: ID, $slug: String) {
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
  const { data, loading, error } = useQuery(AssortmentProductsQuery, {
    variables: {
      slug,
      assortmentId,
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
