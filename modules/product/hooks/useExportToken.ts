import { useMutation, gql } from '@apollo/client';

const ExportTokenMutation = gql`
  mutation ExportToken(
    $tokenId: String!
    $quantity: Int! = 1
    $recipientWalletAddress: String!
  ) {
    exportToken(
      tokenId: $tokenId
      quantity: $quantity
      recipientWalletAddress: $recipientWalletAddress
    ) {
      _id
    }
  }
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
