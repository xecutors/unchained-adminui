import { useQuery, gql } from '@apollo/client';
import ProductMediaTextsFragment from '../fragments/ProductMediaTextsFragment';

export const TranslatedProductVariationQuery = gql`
  query translatedProductVariationTexts(
    $productVariationId: ID!
    $productVariationOptionValue: String
  ) {
    translatedProductVariationTexts(
      productVariationId: $productVariationId
      productVariationOptionValue: $productVariationOptionValue
    ) {
      _id
      locale
      title
      subtitle
    }
  }
  ${ProductMediaTextsFragment}
`;

const useTranslatedProductMediaTexts = ({
  productVariationId,
  productVariationOptionValue,
}) => {
  const { data, loading, error } = useQuery(TranslatedProductVariationQuery, {
    skip: !productVariationId,
    variables: {
      productVariationId,
      productVariationOptionValue,
    },
  });
  const translatedMediaTexts = data?.translatedProductVariationTexts || [];

  return {
    translatedMediaTexts,
    loading,
    error,
  };
};

export default useTranslatedProductMediaTexts;
