import { useQuery, gql } from '@apollo/client';
import { ILanguageQuery, ILanguageQueryVariables } from '../../../gql/types';
import useUnchainedContext from '../../UnchainedContext/useUnchainedContext';
import LanguageFragment from '../fragments/LanguageFragment';

const GetLanguageQuery = (inlineFragment = '') => gql`
  query Language($languageId: ID!) {
    language(languageId: $languageId) {
      ...LanguageFragment
      ${inlineFragment}
    }
  }
  ${LanguageFragment}
`;

const useLanguage = ({ languageId }: ILanguageQueryVariables) => {
  const { customProperties } = useUnchainedContext();
  const { data, loading, error } = useQuery<
    ILanguageQuery,
    ILanguageQueryVariables
  >(GetLanguageQuery(customProperties?.Language), {
    skip: !languageId,
    variables: { languageId },
  });

  return {
    language: data?.language,
    loading,
    error,
  };
};

export default useLanguage;
