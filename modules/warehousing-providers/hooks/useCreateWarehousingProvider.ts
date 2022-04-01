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
  const [createWarehousingProviderMutation, { data, loading, error }] =
    useMutation(CreateWarehousingProviderMutation);

  const createWarehousingProvider = async ({ adapterKey, type }) => {
    return createWarehousingProviderMutation({
      variables: { warehousingProvider: { adapterKey, type } },
      refetchQueries: ['WarehousingProviders', 'WarehousingProvider'],
    });
  };

  const newWarehousingProvider = data?.createWarehousingProvider;

  return {
    createWarehousingProvider,
    newWarehousingProvider,
    loading,
    error,
  };
};

export default useCreateWarehousingProvider;
