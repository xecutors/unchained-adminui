import { useMutation, gql } from '@apollo/client';

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
  const [createFilterOptionMutation] = useMutation(CreateFilterOptionMutation);

  const createFilterOption = async ({ filterId, value, title }) => {
    return createFilterOptionMutation({
      variables: { filterId, option: { value, title } },
      refetchQueries: ['Filters'],
    });
  };

  return {
    createFilterOption,
  };
};

export default useCreateFilterOption;
