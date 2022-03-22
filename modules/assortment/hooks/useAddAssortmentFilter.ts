import { useMutation, gql } from '@apollo/client';

const AddAssortmentFilterMutation = gql`
  mutation AddAssortmentFilter(
    $assortmentId: ID!
    $filterId: ID!
    $tags: [String!]
  ) {
    addAssortmentFilter(
      assortmentId: $assortmentId
      filterId: $filterId
      tags: $tags
    ) {
      _id
    }
  }
`;

const useAddAssortmentFilter = () => {
  const [addAssortmentFilterMutation] = useMutation(
    AddAssortmentFilterMutation,
  );

  const addAssortmentFilter = async ({ assortmentId, filterId, tags }) => {
    return addAssortmentFilterMutation({
      variables: { assortmentId, filterId, tags },
      refetchQueries: ['AssortmentFilters', 'Assortment'],
    });
  };

  return {
    addAssortmentFilter,
  };
};

export default useAddAssortmentFilter;
