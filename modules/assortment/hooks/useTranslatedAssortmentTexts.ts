import { useQuery, gql } from '@apollo/client';

import AssortmentTextsFragment from '../fragments/AssortmentTextsFragment';

export const TranslatedAssortmentTextsQuery = gql`
  query TranslatedAssortmentTexts($assortmentId: ID!) {
    translatedAssortmentTexts(assortmentId: $assortmentId) {
      ...AssortmentTextsFragment
    }
  }
  ${AssortmentTextsFragment}
`;

const useTranslatedAssortmentTexts = ({ assortmentId = null } = {}) => {
  const { data, loading, error } = useQuery(TranslatedAssortmentTextsQuery, {
    variables: {
      assortmentId,
    },
  });
  const translatedAssortmentTexts = data?.translatedAssortmentTexts || [];

  return {
    loading,
    error,
    translatedAssortmentTexts,
  };
};

export default useTranslatedAssortmentTexts;
