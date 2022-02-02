import { useQuery, gql } from '@apollo/client';
import ProductTextsFragment from '../fragments/ProductTextsFragment';

export const TranslatedProductTextsQuery = gql`
  query TranslatedProductTexts($productId: ID!) {
    translatedProductTexts(productId: $productId) {
      ...ProductTextsFragment
    }
  }
  ${ProductTextsFragment}
`;

const useTranslatedProductTexts = ({ productId }) => {
  const { data, loading, error } = useQuery(TranslatedProductTextsQuery, {
    variables: {
      productId,
    },
  });
  const translatedTexts = data?.translatedProductTexts || [];

  return {
    translatedTexts,
    loading,
    error,
  };
};

export default useTranslatedProductTexts;
