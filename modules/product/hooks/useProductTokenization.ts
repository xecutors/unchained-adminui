import { useQuery, gql } from '@apollo/client';
import {
  IProductTokenizationQuery,
  IProductTokenizationQueryVariables,
} from '../../../gql/types';
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
        contractStandard
        contractAddress
      }
    }
  }
`;

const useProductTokenization = ({
  productId: id = null,
  slug = null,
}: IProductTokenizationQueryVariables = {}) => {
  const parsedId = parseUniqueId(slug);

  const { data, loading, error } = useQuery<
    IProductTokenizationQuery,
    IProductTokenizationQueryVariables
  >(ProductTokenizationQuery, {
    skip: !id && !slug,
    variables: {
      productId: id || parsedId,
    },
  });

  const product = data?.product;

  return {
    product,
    loading,
    error,
  };
};

export default useProductTokenization;
