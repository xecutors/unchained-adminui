import { useMutation, gql } from '@apollo/client';
import TokenFragment from '../fragments/TokenFragment';

const ExportTokenMutation = gql`
  mutation ExportToken(
    $tokenId: ID!
    $quantity: Int! = 1
    $recipientWalletAddress: String!
  ) {
    exportToken(
      tokenId: $tokenId
      quantity: $quantity
      recipientWalletAddress: $recipientWalletAddress
    ) {
      ...TokenFragment
    }
  }
  ${TokenFragment}
`;

const useExportToken = () => {
  const [exportTokenMutation] = useMutation(ExportTokenMutation);

  const exportToken = async ({ quantity, recipientWalletAddress, tokenId }) => {
    return exportTokenMutation({
      variables: {
        quantity,
        recipientWalletAddress,
        tokenId,
      },
    });
  };

  return {
    exportToken,
  };
};

export default useExportToken;
