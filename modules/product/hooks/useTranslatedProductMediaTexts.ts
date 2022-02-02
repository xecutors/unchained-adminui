import { useQuery, gql } from '@apollo/client';
import ProductMediaTextsFragment from '../fragments/ProductMediaTextsFragment';

export const TranslatedProductMediaQuery = gql`
  query TranslatedProductMediaTexts($productMediaId: ID!) {
    translatedProductMediaTexts(productMediaId: $productMediaId) {
      ...ProductMediaTextsFragment
    }
  }
  ${ProductMediaTextsFragment}
`;

const useTranslatedProductMediaTexts = ({ productId }) => {
  const { data, loading, error } = useQuery(TranslatedProductMediaQuery, {
    variables: {
      productId,
    },
  });
  const translatedMediaTexts = data?.translatedProductMediaTexts || [];

  return {
    translatedMediaTexts,
    loading,
    error,
  };
};

export default useTranslatedProductMediaTexts;
