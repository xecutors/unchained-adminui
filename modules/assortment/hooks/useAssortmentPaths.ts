import { useQuery, gql } from '@apollo/client';

const AssortmentPathsQuery = gql`
  query AssortmentPaths($assortmentId: ID!) {
    assortment(assortmentId: $assortmentId) {
      assortmentPaths {
        links {
          assortmentId
        }
      }
    }
  }
`;

const useAssortmentPaths = ({ assortmentId }) => {
  const { data, loading, error } = useQuery(AssortmentPathsQuery, {
    variables: {
      assortmentId,
    },
  });

  const assortmentsPaths = (data?.assortment?.assortmentPaths || [])?.flatMap(
    ({ links }) => links,
  );

  return { assortmentsPaths, loading, error };
};

export default useAssortmentPaths;
