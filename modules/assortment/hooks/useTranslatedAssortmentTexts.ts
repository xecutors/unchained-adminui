import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';

import AssortmentTextsFragment from '../fragments/AssortmentTextsFragment';

export const TranslatedAssortmentTextsQuery = gql`
  query TranslatedAssortmentTexts($assortmentId: ID!, $forceLocale: String) {
    translatedAssortmentTexts(assortmentId: $assortmentId) {
      ...AssortmentTextsFragment
    }
  }
  ${AssortmentTextsFragment}
`;

const useTranslatedAssortmentTexts = ({ assortmentId = null } = {}) => {
  const { locale } = useIntl();

  const { data, loading, error } = useQuery(TranslatedAssortmentTextsQuery, {
    skip: !assortmentId,
    variables: {
      assortmentId,
      forceLocale: locale,
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
