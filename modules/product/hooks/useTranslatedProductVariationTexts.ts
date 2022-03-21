import { useQuery, gql } from '@apollo/client';

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
`;

const useTranslatedProductVariationTexts = ({
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
  const translatedVariationTexts = data?.translatedProductVariationTexts || [];

  return {
    translatedVariationTexts,
    loading,
    error,
  };
};

export default useTranslatedProductVariationTexts;
