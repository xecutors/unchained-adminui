import { useMutation, gql } from '@apollo/client';
import AssortmentLinkFragment from '../fragments/AssortmentLinkFragment';

const RemoveAssortmentLinkMutation = gql`
  mutation RemoveAssortmentLink($assortmentLinkId: ID!) {
    removeAssortmentLink(assortmentLinkId: $assortmentLinkId) {
      ...AssortmentLinkFragment
    }
  }
  ${AssortmentLinkFragment}
`;

const useRemoveAssortmentLink = () => {
  const [removeAssortmentLinkMutation] = useMutation(
    RemoveAssortmentLinkMutation,
  );

  const removeAssortmentLink = async ({ assortmentLinkId }) => {
    return removeAssortmentLinkMutation({
      variables: { assortmentLinkId },
      refetchQueries: ['AssortmentLinks'],
    });
  };

  return {
    removeAssortmentLink,
  };
};

export default useRemoveAssortmentLink;
