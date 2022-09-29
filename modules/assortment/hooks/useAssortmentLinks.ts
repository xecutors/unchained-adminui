import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';
import { parseUniqueId } from '../../common/utils/getUniqueId';
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

const useAssortmentLinks = ({ assortmentId: id = null, slug = null } = {}) => {
  const { locale } = useIntl();
  const parsedId = parseUniqueId(slug);
  const { data, loading, error } = useQuery(AssortmentLinksQuery, {
    skip: !id && !parsedId,
    variables: {
      assortmentId: id || parsedId,
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
