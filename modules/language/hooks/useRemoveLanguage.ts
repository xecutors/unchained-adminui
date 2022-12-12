import { useMutation, gql } from '@apollo/client';
import LanguageFragment from '../fragments/LanguageFragment';

const RemoveLanguageMutation = gql`
  mutation RemoveLanguage($languageId: ID!) {
    removeLanguage(languageId: $languageId) {
      ...LanguageFragment
    }
  }
  ${LanguageFragment}
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
