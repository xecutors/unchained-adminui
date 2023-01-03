import { useQuery, gql } from '@apollo/client';
import useUnchainedContext from '../../UnchainedContext/useUnchainedContext';
import LanguageFragment from '../fragments/LanguageFragment';

export const GetLanguageQuery = (inlineFragment = '') => gql`
  query Language($languageId: ID!) {
    language(languageId: $languageId) {
      ...LanguageFragment
      ${inlineFragment}
    }
  }
  ${LanguageFragment}
`;

const useLanguage = ({ languageId }) => {
  const { customProperties } = useUnchainedContext();
  const { data, loading, error } = useQuery(
    GetLanguageQuery(customProperties?.Language),
    {
      skip: !languageId,
      variables: { languageId },
    },
  );

  return {
    language: data?.language,
    loading,
    error,
  };
};

export default useLanguage;
