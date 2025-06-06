import { useMutation, gql } from '@apollo/client';
import {
  ICreateFilterOptionMutation,
  ICreateFilterOptionMutationVariables,
} from '../../../gql/types';

const CreateFilterOptionMutation = gql`
  mutation CreateFilterOption(
    $filterId: ID!
    $option: String!
    $title: String
  ) {
    createFilterOption(filterId: $filterId, option: $option) {
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
    title,
  }: ICreateFilterOptionMutationVariables) => {
    return createFilterOptionMutation({
      variables: { filterId, option, title },
      refetchQueries: ['FilterOptions'],
    });
  };

  return {
    createFilterOption,
  };
};

export default useCreateFilterOption;
