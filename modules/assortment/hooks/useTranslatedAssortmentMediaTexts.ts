import { useQuery, gql } from '@apollo/client';

import AssortmentMediaTextsFragment from '../fragments/AssortmentMediaTextsFragment';

export const TranslatedAssortmentMediaTextsQuery = gql`
  query TranslatedAssortmentMediaTexts($assortmentMediaId: ID!) {
    translatedAssortmentMediaTexts(assortmentMediaId: $assortmentMediaId) {
      ...AssortmentMediaTextsFragment
    }
  }
  ${AssortmentMediaTextsFragment}
`;

const useTranslatedAssortmentMediaTexts = ({
  assortmentMediaId = null,
} = {}) => {
  const { data, loading, error } = useQuery(
    TranslatedAssortmentMediaTextsQuery,
    {
      skip: !assortmentMediaId,
      variables: {
        assortmentMediaId,
      },
    },
  );
  const translatedAssortmentMediaTexts =
    data?.translatedAssortmentMediaTexts || [];

  return {
    loading,
    error,
    translatedAssortmentMediaTexts,
  };
};

export default useTranslatedAssortmentMediaTexts;
