import { useQuery, gql } from '@apollo/client';
import { parseUniqueId } from '../../common/utils/getUniqueId';
import useUnchainedContext from '../../UnchainedContext/useUnchainedContext';
import ProductDetailFragment from '../fragments/ProductDetailFragment';

export const GetProductQuery = (inlineFragment = '') => gql`
  query Product($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      ...ProductDetailFragment
      ${inlineFragment}
      ... on SimpleProduct {
        texts {
          _id
          title
          subtitle
          description
        }
      }
      ... on ConfigurableProduct {
        texts {
          _id
          title
          subtitle
          description
        }
      }
      ... on PlanProduct {
        texts {
          _id
          title
          subtitle
          description
        }
      }
      ... on BundleProduct {
        texts {
          _id
          title
          subtitle
          description
        }
      }
    }
  }
  ${ProductDetailFragment}
`;

const useProduct = ({ productId: id = null, slug = null } = {}) => {
  const parsedId = parseUniqueId(slug);

  const { customProperties } = useUnchainedContext();
  const { data, loading, error } = useQuery(
    GetProductQuery(customProperties?.Product),
    {
      skip: !id && !parsedId,
      variables: { productId: id || parsedId },
    },
  );

  return {
    product: data?.product,
    loading,
    error,
  };
};

export default useProduct;
