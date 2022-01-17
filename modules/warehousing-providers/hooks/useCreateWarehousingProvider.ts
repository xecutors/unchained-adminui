import { useMutation, gql } from '@apollo/client';

const CreateWarehousingProviderMutation = gql`
  mutation CreateWarehousingProvider(
    $warehousingProvider: CreateWarehousingProviderInput!
  ) {
    createWarehousingProvider(warehousingProvider: $warehousingProvider) {
      _id
    }
  }
`;

const useCreateWarehousingProvider = () => {
  const [createWarehousingProviderMutation] = useMutation(
    CreateWarehousingProviderMutation,
  );

  const createWarehousingProvider = async ({ adapterKey, type }) => {
    return createWarehousingProviderMutation({
      variables: { warehousingProvider: { adapterKey, type } },
      refetchQueries: ['WarehousingProviders'],
    });
  };

  return {
    createWarehousingProvider,
  };
};

export default useCreateWarehousingProvider;
