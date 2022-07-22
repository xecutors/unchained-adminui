import { useMutation, gql } from '@apollo/client';

const RemoveAssortmentLinkMutation = gql`
  mutation RemoveAssortmentLink($assortmentLinkId: ID!) {
    removeAssortmentLink(assortmentLinkId: $assortmentLinkId) {
      _id
    }
  }
`;

const useRemoveAssortmentLink = () => {
  const [removeAssortmentLinkMutation] = useMutation(
    RemoveAssortmentLinkMutation,
  );

  const removeAssortmentLink = async ({ assortmentLinkId }) => {
    return removeAssortmentLinkMutation({
      variables: { assortmentLinkId },
      refetchQueries: ['AssortmentLinks', 'Assortments'],
    });
  };

  return {
    removeAssortmentLink,
  };
};

export default useRemoveAssortmentLink;
