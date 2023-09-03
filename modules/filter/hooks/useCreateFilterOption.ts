import { useMutation, gql } from '@apollo/client';
import {
  ICreateFilterOptionMutation,
  ICreateFilterOptionMutationVariables,
} from '../../../gql/types';

const CreateFilterOptionMutation = gql`
  mutation CreateFilterOption(
    $filterId: ID!
    $option: CreateFilterOptionInput!
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
  }: ICreateFilterOptionMutationVariables) => {
    return createFilterOptionMutation({
      variables: { filterId, option },
      refetchQueries: ['FilterOptions'],
    });
  };

  return {
    createFilterOption,
  };
};

export default useCreateFilterOption;
