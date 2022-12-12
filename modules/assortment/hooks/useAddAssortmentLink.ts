import { useMutation, gql } from '@apollo/client';
import AssortmentLinkFragment from '../fragments/AssortmentLinkFragment';

const AddAssortmentLinkMutation = gql`
  mutation AddAssortmentLink(
    $parentAssortmentId: ID!
    $childAssortmentId: ID!
    $tags: [LowerCaseString!]
  ) {
    addAssortmentLink(
      parentAssortmentId: $parentAssortmentId
      childAssortmentId: $childAssortmentId
      tags: $tags
    ) {
      ...AssortmentLinkFragment
    }
  }
  ${AssortmentLinkFragment}
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
      refetchQueries: ['AssortmentLinks'],
    });
  };

  return {
    addAssortmentLink,
  };
};

export default useAddAssortmentLink;
