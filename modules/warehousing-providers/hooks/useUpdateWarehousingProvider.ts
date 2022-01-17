import { useMutation, gql } from '@apollo/client';
import WarehousingProviderFragment from '../fragments/WarehousingProviderFragment';

const UpdateWarehousingProviderMutation = gql`
  mutation UpdateWarehousingProvider(
    $warehousingProvider: UpdateProviderInput!
    $warehousingProviderId: ID!
  ) {
    updateWarehousingProvider(
      warehousingProvider: $warehousingProvider
      warehousingProviderId: $warehousingProviderId
    ) {
      ...WarehousingProviderFragment
    }
  }
  ${WarehousingProviderFragment}
`;

const useUpdateWarehousingProvider = () => {
  const [updateWarehousingProviderMutation] = useMutation(
    UpdateWarehousingProviderMutation,
  );

  const updateWarehousingProvider = async ({
    warehousingProvider,
    warehousingProviderId,
  }) => {
    return updateWarehousingProviderMutation({
      variables: {
        warehousingProvider,
        warehousingProviderId,
      },
      refetchQueries: ['WarehousingProvider', 'WarehousingProviders'],
    });
  };

  return {
    updateWarehousingProvider,
  };
};

export default useUpdateWarehousingProvider;
