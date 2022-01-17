import { useMutation, gql } from '@apollo/client';

const RemoveWarehousingProviderMutation = gql`
  mutation RemoveWarehousingProvider($warehousingProviderId: ID!) {
    removeWarehousingProvider(warehousingProviderId: $warehousingProviderId) {
      _id
    }
  }
`;

const useRemoveWarehousingProvider = () => {
  const [removeWarehousingProviderMutation] = useMutation(
    RemoveWarehousingProviderMutation,
  );

  const removeWarehousingProvider = async ({ warehousingProviderId }) => {
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
