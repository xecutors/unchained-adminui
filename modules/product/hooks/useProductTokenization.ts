import { useQuery, gql } from '@apollo/client';
import { parseUniqueId } from '../../common/utils/getUniqueId';

export const ProductTokenizationQuery = gql`
  query ProductTokenization($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      _id
      ... on TokenizedProduct {
        contractConfiguration {
          tokenId
          supply
        }
        ercMetadata
        contractStandard
        contractAddress
      }
    }
  }
`;

const useProductTokenization = ({ productId: id = null, slug = null } = {}) => {
  const parsedId = parseUniqueId(slug);

  const { data, loading, error } = useQuery(ProductTokenizationQuery, {
    skip: !id && !slug,
    variables: {
      productId: id || parsedId,
    },
  });

  const product = data?.product || {};

  return {
    product,
    loading,
    error,
  };
};

export default useProductTokenization;
