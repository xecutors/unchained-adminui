import { useMutation, gql } from '@apollo/client';
import {
  IReorderAssortmentProductsMutation,
  IReorderAssortmentProductsMutationVariables,
} from '../../../gql/types';

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
  const [reorderAssortmentProductsMutation] = useMutation<
    IReorderAssortmentProductsMutation,
    IReorderAssortmentProductsMutationVariables
  >(ReorderAssortmentProductsMutation);

  const reorderAssortmentProducts = async ({
    sortKeys,
  }: IReorderAssortmentProductsMutationVariables) => {
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
