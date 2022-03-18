import { useQuery, gql } from '@apollo/client';
import LanguageFragment from '../fragments/LanguageFragment';

export const LanguageQuery = gql`
  query Language($languageId: ID!) {
    language(languageId: $languageId) {
      ...LanguageFragment
    }
  }
  ${LanguageFragment}
`;

const useLanguage = ({ languageId }) => {
  const { data, loading, error } = useQuery(LanguageQuery, {
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
