import { useMutation, gql } from '@apollo/client';
import WarehousingProviderFragment from '../fragments/WarehousingProviderFragment';

const CreateWarehousingProviderMutation = gql`
  mutation CreateWarehousingProvider(
    $warehousingProvider: CreateWarehousingProviderInput!
  ) {
    createWarehousingProvider(warehousingProvider: $warehousingProvider) {
      ...WarehousingProviderFragment
    }
  }
  ${WarehousingProviderFragment}
`;

const useCreateWarehousingProvider = () => {
  const [createWarehousingProviderMutation, { data, loading, error }] =
    useMutation(CreateWarehousingProviderMutation);

  const createWarehousingProvider = async ({ adapterKey, type }) => {
    return createWarehousingProviderMutation({
      variables: { warehousingProvider: { adapterKey, type } },
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
