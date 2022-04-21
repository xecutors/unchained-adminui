import { useQuery, gql } from '@apollo/client';
import AssortmentChildrenFragment from '../fragments/AssortmentChildrenFragment';

const AssortmentPathsQuery = gql`
  query AssortmentPaths {
    assortments {
      ...AssortmentChildrenFragment
      children {
        ...AssortmentChildrenFragment
        children {
          ...AssortmentChildrenFragment
        }
      }
    }
  }
  ${AssortmentChildrenFragment}
`;

const useAssortmentPaths = () => {
  const { data, loading, error } = useQuery(AssortmentPathsQuery);

  const assortments = data?.assortments || [];

  return { assortments, loading, error };
};

export default useAssortmentPaths;
