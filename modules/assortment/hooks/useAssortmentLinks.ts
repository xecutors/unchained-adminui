import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';
import AssortmentFragment from '../fragments/AssortmentFragment';

export const AssortmentLinksQuery = gql`
  query AssortmentLinks(
    $assortmentId: ID
    $slug: String
    $forceLocale: String
  ) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      _id
      linkedAssortments {
        _id
        sortKey
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
  const { locale } = useIntl();

  const { data, loading, error } = useQuery(AssortmentLinksQuery, {
    skip: !assortmentId && !slug,
    variables: {
      slug,
      assortmentId,
      forceLocale: locale,
    },
    fetchPolicy: 'cache-first',
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
