import { useMutation, gql } from '@apollo/client';

const CreateLanguageMutation = gql`
  mutation CreateLanguage($language: CreateLanguageInput!) {
    createLanguage(language: $language) {
      _id
    }
  }
`;

const useCreateLanguage = () => {
  const [createLanguageMutation, { data, loading, error }] = useMutation(
    CreateLanguageMutation,
  );

  const createLanguage = async ({ isoCode }) => {
    return createLanguageMutation({
      variables: { language: { isoCode } },
      refetchQueries: ['Language', 'Languages'],
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
