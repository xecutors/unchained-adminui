import { useQuery, gql } from '@apollo/client';

import AssortmentFragment from '../fragments/AssortmentFragment';

export const AssortmentQuery = gql`
  query Assortment($assortmentId: ID, $slug: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      ...AssortmentFragment
      texts {
        _id
        slug
        title
        subtitle
        description
      }
    }
  }
  ${AssortmentFragment}
`;

const useAssortment = ({ assortmentId = null, slug = null } = {}) => {
  const { data, loading, error } = useQuery(AssortmentQuery, {
    skip: !assortmentId && !slug,
    variables: {
      slug,
      assortmentId,
    },
  });

  return {
    loading,
    error,
    assortment: data?.assortment,
  };
};

export const preFetchAssortment = async (
  apolloClient,
  { assortmentId = null, slug = null },
) => {
  const { data } = await apolloClient.query({
    query: AssortmentQuery,
    skip: !assortmentId && !slug,
    variables: { assortmentId, slug },
  });
  return data?.assortment;
};

export default useAssortment;
