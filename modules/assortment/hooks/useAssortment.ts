import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';

import AssortmentFragment from '../fragments/AssortmentFragment';

export const AssortmentQuery = gql`
  query Assortment($assortmentId: ID, $slug: String, $forceLocale: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      ...AssortmentFragment
    }
  }
  ${AssortmentFragment}
`;

const useAssortment = ({ assortmentId = null, slug = null } = {}) => {
  const { locale } = useIntl();
<<<<<<< HEAD
=======

>>>>>>> 89c5330a (force localiziation)
  const { data, loading, error } = useQuery(AssortmentQuery, {
    skip: !assortmentId && !slug,
    variables: {
      slug,
      assortmentId,
      forceLocale: locale,
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
