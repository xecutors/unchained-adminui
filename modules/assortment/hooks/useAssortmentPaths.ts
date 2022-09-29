import { useQuery, gql } from '@apollo/client';
import { parseSlug } from '../../common/utils/getUniqueId';
import AssortmentChildrenFragment from '../fragments/AssortmentChildrenFragment';

const AssortmentPathsQuery = gql`
  query AssortmentPaths(
    $slugs: [String!]
    $includeInactive: Boolean
    $includeLeaves: Boolean
    $forceLocale: String
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

const useAssortmentPaths = ({
  slugs,
  includeInactive = false,
  includeLeaves = false,
  forceLocale,
}) => {
  const normalizedSlug = slugs?.map((slug) => parseSlug(slug));
  const { data, loading, error } = useQuery(AssortmentPathsQuery, {
    variables: {
      slugs: normalizedSlug,
      includeInactive,
      includeLeaves,
      forceLocale,
    },
    returnPartialData: true,
    notifyOnNetworkStatusChange: true,
  });

  const assortments = data?.assortments || [];

  return { assortments, loading, error };
};

export default useAssortmentPaths;
