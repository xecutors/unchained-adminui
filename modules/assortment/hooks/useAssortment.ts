import { useQuery, gql } from '@apollo/client';
import { parseUniqueId } from '../../common/utils/getUniqueId';

import AssortmentFragment from '../fragments/AssortmentFragment';

export const AssortmentQuery = gql`
  query Assortment($assortmentId: ID, $slug: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      ...AssortmentFragment
    }
  }
  ${AssortmentFragment}
`;

const useAssortment = ({ assortmentId: id = null, slug = null } = {}) => {
  const parsedId = parseUniqueId(slug);
  const { data, loading, error } = useQuery(AssortmentQuery, {
    skip: !id && !slug,
    variables: {
      assortmentId: id || parsedId,
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
  { assortmentId: id = null, slug = null },
) => {
  const parsedId = parseUniqueId(slug);
  const { data } = await apolloClient.query({
    query: AssortmentQuery,
    skip: !id && !parsedId,
    variables: { assortmentId: id || parsedId },
  });
  return data?.assortment;
};

export default useAssortment;
