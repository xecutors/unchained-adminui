import { useMutation, gql } from '@apollo/client';
import {
  ICreateLanguageInput,
  ICreateLanguageMutation,
  ICreateLanguageMutationVariables,
} from '../../../gql/types';
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
  const [createLanguageMutation, { data, loading, error }] = useMutation<
    ICreateLanguageMutation,
    ICreateLanguageMutationVariables
  >(CreateLanguageMutation);

  const createLanguage = async ({ isoCode }: ICreateLanguageInput) => {
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
