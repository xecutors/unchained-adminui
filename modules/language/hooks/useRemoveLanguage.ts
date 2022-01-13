import { useMutation, gql } from '@apollo/client';

const RemoveLanguageMutation = gql`
  mutation RemoveLanguage($languageId: ID!) {
    removeLanguage(languageId: $languageId) {
      _id
    }
  }
`;

const useRemoveLanguage = () => {
  const [removeLanguageMutation] = useMutation(RemoveLanguageMutation);

  const removeLanguage = async ({ languageId }) => {
    return removeLanguageMutation({
      variables: { languageId },
      refetchQueries: ['Languages'],
    });
  };

  return {
    removeLanguage,
  };
};

export default useRemoveLanguage;
