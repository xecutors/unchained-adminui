import { useQuery, gql } from '@apollo/client';
import AssortmentFragment from '../fragments/AssortmentFragment';

const AssortmentsCountQuery = gql`
  query Assortments(
    $queryString: String
    $tags: [LowerCaseString!]
    $slugs: [String!]
    $includeInactive: Boolean
    $includeLeaves: Boolean
  ) {
    assortmentsCount(
      tags: $tags
      slugs: $slugs
      includeInactive: $includeInactive
      includeLeaves: $includeLeaves
      queryString: $queryString
    )
  }
`;

const useAssortmentsCount = ({
  queryString = '',
  tags = null,
  slugs = null,
  includeInactive = true,
  includeLeaves = false,
}) => {
  const { data, loading, error } = useQuery(AssortmentsCountQuery, {
    variables: {
      queryString,
      tags,
      slugs: slugs || null,
      includeInactive,
      includeLeaves,
    },
  });
  console.log(data);
  const assortmentsCount = data?.assortmentsCount;

  return {
    loading,
    error,
    assortmentsCount,
  };
};

export default useAssortmentsCount;
