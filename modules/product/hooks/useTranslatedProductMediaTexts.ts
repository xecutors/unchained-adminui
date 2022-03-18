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

const useTranslatedProductMediaTexts = ({ productMediaId }) => {
  const { data, loading, error } = useQuery(TranslatedProductMediaQuery, {
    skip: !productMediaId,
    variables: {
      productMediaId,
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
