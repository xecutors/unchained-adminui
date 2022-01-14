import { useMutation, gql } from '@apollo/client';
import { LanguagesQuery } from './useLanguages';

const CreateLanguageMutation = gql`
  mutation CreateLanguage($language: CreateLanguageInput!) {
    createLanguage(language: $language) {
      _id
    }
  }
`;

const useCreateLanguage = () => {
  const [createLanguageMutation] = useMutation(CreateLanguageMutation);

  const createLanguage = async ({ isoCode }) => {
    return createLanguageMutation({
      variables: { language: { isoCode } },
      refetchQueries: [{ query: LanguagesQuery }],
    });
  };

  return {
    createLanguage,
  };
};

export default useCreateLanguage;
