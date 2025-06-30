import { useMutation, gql } from '@apollo/client';
import {
  ICreateFilterOptionMutation,
  ICreateFilterOptionMutationVariables,
} from '../../../gql/types';

const CreateFilterOptionMutation = gql`
  mutation CreateFilterOption(
    $filterId: ID!
    $option: String!
    $texts: [FilterTextInput!]
  ) {
    createFilterOption(filterId: $filterId, option: $option, texts: $texts) {
      _id
    }
  }
`;

const useCreateFilterOption = () => {
  const [createFilterOptionMutation] = useMutation<
    ICreateFilterOptionMutation,
    ICreateFilterOptionMutationVariables
  >(CreateFilterOptionMutation);

  const createFilterOption = async ({
    filterId,
    option,
    texts,
  }: ICreateFilterOptionMutationVariables) => {
    return createFilterOptionMutation({
      variables: { filterId, option, texts },
      refetchQueries: ['FilterOptions'],
    });
  };

  return {
    createFilterOption,
  };
};

export default useCreateFilterOption;
