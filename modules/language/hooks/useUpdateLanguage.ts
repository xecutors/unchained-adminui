import { useMutation, gql } from '@apollo/client';
import {
  IMutationUpdateLanguageArgs,
  IUpdateLanguageInput,
  IUpdateLanguageMutation,
  IUpdateLanguageMutationVariables,
} from '../../../gql/types';
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
  const [updateLanguageMutation] = useMutation<
    IUpdateLanguageMutation,
    IUpdateLanguageMutationVariables
  >(UpdateLanguageMutation);

  const updateLanguage = async ({
    language: { isoCode, isActive },
    languageId,
  }: IMutationUpdateLanguageArgs) => {
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
