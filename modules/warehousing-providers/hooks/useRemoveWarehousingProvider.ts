import { useMutation, gql } from '@apollo/client';
import {
  IRemoveWarehousingProviderMutation,
  IRemoveWarehousingProviderMutationVariables,
} from '../../../gql/types';

const RemoveWarehousingProviderMutation = gql`
  mutation RemoveWarehousingProvider($warehousingProviderId: ID!) {
    removeWarehousingProvider(warehousingProviderId: $warehousingProviderId) {
      _id
    }
  }
`;

const useRemoveWarehousingProvider = () => {
  const [removeWarehousingProviderMutation] = useMutation<
    IRemoveWarehousingProviderMutation,
    IRemoveWarehousingProviderMutationVariables
  >(RemoveWarehousingProviderMutation);

  const removeWarehousingProvider = async ({
    warehousingProviderId,
  }: IRemoveWarehousingProviderMutationVariables) => {
    return removeWarehousingProviderMutation({
      variables: {
        warehousingProviderId,
      },
      refetchQueries: ['WarehousingProviders'],
    });
  };

  return {
    removeWarehousingProvider,
  };
};

export default useRemoveWarehousingProvider;
