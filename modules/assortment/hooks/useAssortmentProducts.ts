import { useQuery, gql } from '@apollo/client';
import ProductBriefFragment from '../../product/fragments/ProductBriefFragment';

export const AssortmentProductsQuery = gql`
  query AssortmentProducts($assortmentId: ID, $slug: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      _id
      productAssignments {
        ...ProductBriefFragment
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
  const assortmentProducts = assortment?.productAssignments || [];
  return {
    loading,
    error,
    assortmentProducts,
  };
};

export default useAssortmentProducts;
