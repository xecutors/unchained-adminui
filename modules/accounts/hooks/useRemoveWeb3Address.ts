import { useMutation, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';

const RemoveWeb3AddressMutation = gql`
  mutation RemoveWeb3Address($address: String!) {
    removeWeb3Address(address: $address) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const useRemoveWeb3Address = () => {
  const [removeWeb3AddressMutation] = useMutation(RemoveWeb3AddressMutation);
  const removeWeb3Address = async ({ address }) => {
    return removeWeb3AddressMutation({
      variables: {
        address,
      },
    });
  };

  return {
    removeWeb3Address,
  };
};

export default useRemoveWeb3Address;
