import { useMutation, gql } from '@apollo/client';
import LanguageFragment from '../fragments/LanguageFragment';

const CreateLanguageMutation = gql`
  mutation CreateLanguage($language: CreateLanguageInput!) {
    createLanguage(language: $language) {
      ...LanguageFragment
    }
  }
  ${LanguageFragment}
`;

const useCreateLanguage = () => {
  const [createLanguageMutation, { data, loading, error }] = useMutation(
    CreateLanguageMutation,
  );

  const createLanguage = async ({ isoCode }) => {
    return createLanguageMutation({
      variables: { language: { isoCode } },
    });
  };
  const newLanguage = data?.createLanguage;
  return {
    createLanguage,
    newLanguage,
    loading,
    error,
  };
};

export default useCreateLanguage;
