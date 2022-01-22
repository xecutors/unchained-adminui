import { useQuery, gql } from '@apollo/client';

import AssortmentFragment from '../fragments/AssortmentFragment';

export const AssortmentQuery = gql`
  query Assortment($assortmentId: ID, $slug: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      ...AssortmentFragment
    }
  }
  ${AssortmentFragment}
`;

const useAssortments = ({ assortmentId = null, slug = null } = {}) => {
  const { data, loading, error } = useQuery(AssortmentQuery, {
    variables: {
      slug,
      assortmentId,
    },
  });

  return {
    loading,
    error,
    assortments: data?.assortment,
  };
};

export default useAssortments;
