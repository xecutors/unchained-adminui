import { useMutation, gql } from '@apollo/client';
import {
  IRemoveAssortmentMutation,
  IRemoveAssortmentMutationVariables,
} from '../../../gql/types';

const RemoveAssortmentMutation = gql`
  mutation RemoveAssortment($assortmentId: ID!) {
    removeAssortment(assortmentId: $assortmentId) {
      _id
    }
  }
`;

const useRemoveAssortment = () => {
  const [removeAssortmentMutation] = useMutation<
    IRemoveAssortmentMutation,
    IRemoveAssortmentMutationVariables
  >(RemoveAssortmentMutation);

  const removeAssortment = async ({
    assortmentId,
  }: IRemoveAssortmentMutationVariables) => {
    return removeAssortmentMutation({
      variables: { assortmentId },
      refetchQueries: ['Assortments', 'ShopStatus'],
    });
  };

  return {
    removeAssortment,
  };
};

export default useRemoveAssortment;
