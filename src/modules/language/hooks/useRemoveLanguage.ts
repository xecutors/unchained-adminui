import { useMutation, gql } from '@apollo/client';
import {
  IRemoveLanguageMutation,
  IRemoveLanguageMutationVariables,
} from '../../../gql/types';
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
  const [removeLanguageMutation] = useMutation<
    IRemoveLanguageMutation,
    IRemoveLanguageMutationVariables
  >(RemoveLanguageMutation);

  const removeLanguage = async ({
    languageId,
  }: IRemoveLanguageMutationVariables) => {
    return removeLanguageMutation({
      variables: { languageId },
      refetchQueries: ['ShopStatus', 'ShopInfo', 'Languages'],
    });
  };

  return {
    removeLanguage,
  };
};

export default useRemoveLanguage;
