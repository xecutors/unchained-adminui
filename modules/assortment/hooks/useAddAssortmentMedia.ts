import { useMutation, gql } from '@apollo/client';
import {
  IAddAssortmentMediaMutation,
  IAddAssortmentMediaMutationVariables,
} from '../../../gql/types';
import AssortmentMediaFragment from '../fragments/AssortmentMediaFragment';

const AddAssortmentMediaMutation = gql`
  mutation AddAssortmentMedia($assortmentId: ID!, $media: Upload!) {
    addAssortmentMedia(assortmentId: $assortmentId, media: $media) {
      ...AssortmentMediaFragment
    }
  }
  ${AssortmentMediaFragment}
`;

const useAddAssortmentMedia = () => {
  const [addAssortmentMediaMutation] = useMutation<
    IAddAssortmentMediaMutation,
    IAddAssortmentMediaMutationVariables
  >(AddAssortmentMediaMutation);

  const addAssortmentMedia = async ({
    assortmentId,
    media,
  }: IAddAssortmentMediaMutationVariables) => {
    return addAssortmentMediaMutation({
      variables: { assortmentId, media },
      refetchQueries: ['AssortmentMedia'],
    });
  };

  return {
    addAssortmentMedia,
  };
};

export default useAddAssortmentMedia;
