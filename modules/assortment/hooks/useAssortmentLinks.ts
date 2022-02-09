import { useQuery, gql } from '@apollo/client';
import AssortmentFragment from '../fragments/AssortmentFragment';

export const AssortmentLinksQuery = gql`
  query AssortmentLinks(
    $assortmentId: ID
    $slug: String
    $isShowLeafNodes: Boolean
  ) {
    assortment(
      assortmentId: $assortmentId
      slug: $slug
      includeLeafNodes: $includeLeafNodes
    ) {
      _id
      linkedAssortments {
        _id
        parent {
          ...AssortmentFragment
        }
        child {
          ...AssortmentFragment
        }
      }
    }
  }
  ${AssortmentFragment}
`;

const useAssortmentLinks = ({
  assortmentId = null,
  slug = null,
  includeLeafNodes = true,
} = {}) => {
  const { data, loading, error } = useQuery(AssortmentLinksQuery, {
    variables: {
      slug,
      assortmentId,
      includeLeafNodes,
    },
  });

  return {
    loading,
    error,
    assortments: data?.assortment,
  };
};

export default useAssortmentLinks;
