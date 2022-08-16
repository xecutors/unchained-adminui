import { useMutation, gql } from '@apollo/client';

const AddAssortmentLinkMutation = gql`
  mutation AddAssortmentLink(
    $parentAssortmentId: ID!
    $childAssortmentId: ID!
    $tags: [String!]
  ) {
    addAssortmentLink(
      parentAssortmentId: $parentAssortmentId
      childAssortmentId: $childAssortmentId
      tags: $tags
    ) {
      _id
    }
  }
`;

const useAddAssortmentLink = () => {
  const [addAssortmentLinkMutation] = useMutation(AddAssortmentLinkMutation);

  const addAssortmentLink = async ({
    parentAssortmentId,
    childAssortmentId,
    tags,
  }) => {
    return addAssortmentLinkMutation({
      variables: { parentAssortmentId, childAssortmentId, tags },
      refetchQueries: ['AssortmentLinks', 'Assortment', 'Assortments'],
    });
  };

  return {
    addAssortmentLink,
  };
};

export default useAddAssortmentLink;
