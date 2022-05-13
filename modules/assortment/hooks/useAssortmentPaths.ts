import { useQuery, gql } from '@apollo/client';
import AssortmentChildrenFragment from '../fragments/AssortmentChildrenFragment';

const AssortmentPathsQuery = gql`
  query AssortmentPaths(
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

const useAssortmentPaths = ({
  slugs,
  includeInactive = false,
  includeLeaves = false,
}) => {
  const { data, loading, error } = useQuery(AssortmentPathsQuery, {
    variables: {
      slugs,
      includeInactive,
      includeLeaves,
    },
    nextFetchPolicy: 'cache-only',
    returnPartialData: true,
    notifyOnNetworkStatusChange: true,
  });

  const assortments = data?.assortments || [];

  return { assortments, loading, error };
};

export default useAssortmentPaths;
