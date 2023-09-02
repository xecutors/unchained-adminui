import { useMutation, gql } from '@apollo/client';
import {
  IRemoveAssortmentProductMutation,
  IRemoveAssortmentProductMutationVariables,
} from '../../../gql/types';

const RemoveAssortmentProductMutation = gql`
  mutation RemoveAssortmentProduct($assortmentProductId: ID!) {
    removeAssortmentProduct(assortmentProductId: $assortmentProductId) {
      _id
    }
  }
`;

const useRemoveAssortmentProduct = () => {
  const [removeAssortmentProductMutation] = useMutation<
    IRemoveAssortmentProductMutation,
    IRemoveAssortmentProductMutationVariables
  >(RemoveAssortmentProductMutation);

  const removeAssortmentProduct = async ({
    assortmentProductId,
  }: IRemoveAssortmentProductMutationVariables) => {
    return removeAssortmentProductMutation({
      variables: { assortmentProductId },
      refetchQueries: ['AssortmentProducts'],
    });
  };

  return {
    removeAssortmentProduct,
  };
};

export default useRemoveAssortmentProduct;
