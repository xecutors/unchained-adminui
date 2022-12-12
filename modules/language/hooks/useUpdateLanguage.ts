import { useMutation, gql } from '@apollo/client';
import LanguageFragment from '../fragments/LanguageFragment';

const UpdateLanguageMutation = gql`
  mutation UpdateLanguage($language: UpdateLanguageInput!, $languageId: ID!) {
    updateLanguage(language: $language, languageId: $languageId) {
      ...LanguageFragment
    }
  }
  ${LanguageFragment}
`;

const useUpdateLanguage = () => {
  const [updateLanguageMutation] = useMutation(UpdateLanguageMutation);

  const updateLanguage = async ({ isoCode, isActive, languageId }) => {
    return updateLanguageMutation({
      variables: {
        language: { isoCode, isActive },
        languageId,
      },
    });
  };

  return {
    updateLanguage,
  };
};

export default useUpdateLanguage;
