import { useQuery, gql } from '@apollo/client';
import AssortmentFragment from '../fragments/AssortmentFragment';

export const AssortmentLinksQuery = gql`
  query AssortmentLinks($assortmentId: ID, $slug: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
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

const useAssortmentLinks = ({ assortmentId = null, slug = null } = {}) => {
  const { data, loading, error } = useQuery(AssortmentLinksQuery, {
    variables: {
      slug,
      assortmentId,
    },
  });
  const assortment = data?.assortment || {};
  const linkedAssortments = assortment?.linkedAssortments || [];

  return {
    loading,
    error,
    linkedAssortments,
  };
};

export default useAssortmentLinks;
