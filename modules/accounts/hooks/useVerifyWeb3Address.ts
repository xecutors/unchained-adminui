import { useMutation, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';

const VerifyWeb3AddressMutation = gql`
  mutation VerifyWeb3Address($address: String!, $hash: String!) {
    verifyWeb3Address(address: $address, hash: $hash) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const useVerifyWeb3Address = () => {
  const [verifyWeb3AddressMutation] = useMutation(VerifyWeb3AddressMutation);
  const verifyWeb3Address = async ({ address, hash }) => {
    return verifyWeb3AddressMutation({
      variables: {
        address,
        hash,
      },
    });
  };

  return {
    verifyWeb3Address,
  };
};

export default useVerifyWeb3Address;
