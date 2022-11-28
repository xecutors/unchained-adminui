import { useQuery, gql } from '@apollo/client';
import { parseSlug } from '../../common/utils/getUniqueId';
import AssortmentChildrenFragment from '../fragments/AssortmentChildrenFragment';

const AssortmentChildrenQuery = gql`
  query AssortmentChildren(
    $slugs: [String!]
    $includeInactive: Boolean
    $includeLeaves: Boolean
  ) {
    assortments(
      slugs: $slugs
      includeInactive: $includeInactive
      includeLeaves: $includeLeaves
    ) {
      ...AssortmentChildrenFragment
      children {
        ...AssortmentChildrenFragment
      }
    }
  }
  ${AssortmentChildrenFragment}
`;

const useAssortmentChildren = ({
  slugs,
  includeInactive = false,
  includeLeaves = false,
  forceLocale,
}) => {
  const normalizedSlug = slugs?.map((slug) => parseSlug(slug));
  const { data, loading, error } = useQuery(AssortmentChildrenQuery, {
    variables: {
      slugs: normalizedSlug,
      includeInactive,
      includeLeaves,
    },
    context: {
      headers: {
        forceLocale,
      },
    },
    returnPartialData: true,
    notifyOnNetworkStatusChange: true,
  });

  const assortments = data?.assortments || [];

  return { assortments, loading, error };
};

export default useAssortmentChildren;
