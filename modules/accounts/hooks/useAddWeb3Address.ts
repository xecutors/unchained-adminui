import { useMutation, gql } from '@apollo/client';

const AddWeb3AddressMutation = gql`
  mutation AddWeb3Address($address: String!) {
    addWeb3Address(address: $address) {
      _id
      web3Addresses {
        address
        nonce
        verified
      }
    }
  }
`;

const useAddWeb3Address = () => {
  const [addWeb3AddressMutation] = useMutation(AddWeb3AddressMutation);
  const addWeb3Address = async ({ address }) => {
    return addWeb3AddressMutation({
      variables: {
        address,
      },
      refetchQueries: ['CurrentUser'],
    });
  };

  return {
    addWeb3Address,
  };
};

export default useAddWeb3Address;
