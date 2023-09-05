import { useQuery, gql } from '@apollo/client';
import {
  ITranslatedProductVariationTextsQuery,
  ITranslatedProductVariationTextsQueryVariables,
} from '../../../gql/types';

export const TranslatedProductVariationTextsQuery = gql`
  query TranslatedProductVariationTexts(
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
}: ITranslatedProductVariationTextsQueryVariables) => {
  const { data, loading, error } = useQuery<
    ITranslatedProductVariationTextsQuery,
    ITranslatedProductVariationTextsQueryVariables
  >(TranslatedProductVariationTextsQuery, {
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
