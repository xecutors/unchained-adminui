import { useMutation, gql } from '@apollo/client';

const ReorderAssortmentLinkMutation = gql`
  mutation ReorderAssortmentLinks($sortKeys: [ReorderAssortmentLinkInput!]!) {
    reorderAssortmentLinks(sortKeys: $sortKeys) {
      _id
    }
  }
`;

const useReorderAssortmentLink = () => {
  const [reorderAssortmentLinkMutation] = useMutation(
    ReorderAssortmentLinkMutation,
  );

  const reorderAssortmentLink = async ({ sortKeys }) => {
    return reorderAssortmentLinkMutation({
      variables: { sortKeys },
      refetchQueries: ['AssortmentLinks'],
    });
  };

  return {
    reorderAssortmentLink,
  };
};

export default useReorderAssortmentLink;
