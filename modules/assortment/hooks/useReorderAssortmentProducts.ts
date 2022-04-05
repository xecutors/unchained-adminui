import { useMutation, gql } from '@apollo/client';

const ReorderAssortmentProductsMutation = gql`
  mutation ReorderAssortmentProducts(
    $sortKeys: [ReorderAssortmentProductInput!]!
  ) {
    reorderAssortmentProducts(sortKeys: $sortKeys) {
      _id
    }
  }
`;

const useReorderAssortmentProducts = () => {
  const [reorderAssortmentProductsMutation] = useMutation(
    ReorderAssortmentProductsMutation,
  );

  const reorderAssortmentProducts = async ({ sortKeys }) => {
    return reorderAssortmentProductsMutation({
      variables: { sortKeys },
      refetchQueries: ['AssortmentProducts'],
    });
  };

  return {
    reorderAssortmentProducts,
  };
};

export default useReorderAssortmentProducts;
