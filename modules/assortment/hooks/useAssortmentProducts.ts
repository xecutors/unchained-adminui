import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';
import { parseUniqueId } from '../../common/utils/getUniqueId';
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

const useAssortmentProducts = ({
  assortmentId: id = null,
  slug = null,
} = {}) => {
  const { locale } = useIntl();
  const parsedId = parseUniqueId(slug);
  const { data, loading, error } = useQuery(AssortmentProductsQuery, {
    skip: !id && !parsedId,
    variables: {
      assortmentId: id || parsedId,
      forceLocale: locale,
    },
    fetchPolicy: 'cache-first',
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
