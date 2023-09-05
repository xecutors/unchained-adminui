import { useQuery, gql } from '@apollo/client';
import {
  IAssortmentProductsQuery,
  IAssortmentProductsQueryVariables,
} from '../../../gql/types';
import { parseUniqueId } from '../../common/utils/getUniqueId';
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

const useAssortmentProducts = ({
  assortmentId: id = null,
  slug = null,
}: IAssortmentProductsQueryVariables = {}) => {
  const parsedId = parseUniqueId(slug);
  const { data, loading, error } = useQuery<IAssortmentProductsQuery>(
    AssortmentProductsQuery,
    {
      skip: !id && !parsedId,
      variables: {
        assortmentId: id || parsedId,
      },
      fetchPolicy: 'cache-first',
    },
  );
  const assortment = data?.assortment;
  const linkedProducts = assortment?.productAssignments || [];
  return {
    loading,
    error,
    linkedProducts,
  };
};

export default useAssortmentProducts;
