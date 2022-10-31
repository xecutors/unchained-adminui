import { useMutation, gql } from '@apollo/client';

const RemoveWeb3AddressMutation = gql`
  mutation RemoveWeb3Account($address: String!) {
    removeWeb3Address(address: $address) {
      _id
    }
  }
`;

const useRemoveWeb3Address = () => {
  const [removeWeb3AddressMutation] = useMutation(RemoveWeb3AddressMutation);
  const removeWeb3Address = async ({ address }) => {
    return removeWeb3AddressMutation({
      variables: {
        address,
      },
      refetchQueries: ['CurrentUser'],
    });
  };

  return {
    removeWeb3Address,
  };
};

export default useRemoveWeb3Address;
