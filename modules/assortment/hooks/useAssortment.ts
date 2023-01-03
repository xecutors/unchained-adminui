import { useQuery, gql } from '@apollo/client';
import { parseUniqueId } from '../../common/utils/getUniqueId';
import useUnchainedContext from '../../UnchainedContext/useUnchainedContext';

import AssortmentFragment from '../fragments/AssortmentFragment';

export const GetAssortmentQuery = (inlineFragment = '') => gql`
  query Assortment($assortmentId: ID, $slug: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      ...AssortmentFragment
      ${inlineFragment}
    }
  }
  ${AssortmentFragment}
`;

const useAssortment = ({ assortmentId: id = null, slug = null } = {}) => {
  const parsedId = parseUniqueId(slug);
  const { customProperties } = useUnchainedContext();
  const { data, loading, error } = useQuery(
    GetAssortmentQuery(customProperties?.Assortment),
    {
      skip: !id && !slug,
      variables: {
        assortmentId: id || parsedId,
      },
    },
  );

  return {
    loading,
    error,
    assortment: data?.assortment,
  };
};

export default useAssortment;
