import { gql } from '@apollo/client';

const TokenFragment = gql`
  fragment TokenFragment on Token {
    _id
    walletAddress
    status
    quantity
    contractAddress
    chainId
    chainTokenId
  }
`;

export default TokenFragment;
