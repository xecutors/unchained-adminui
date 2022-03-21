import useTranslatedProductVariationTexts from '../hooks/useTranslatedProductVariationTexts';
import ProductVariationsListItem from './ProductVariationsListItem';

const ProductVariationsList = ({
  productVariationId,
  selectedLocale,
  variation,
}) => {
  const { translatedVariationTexts } = useTranslatedProductVariationTexts({
    productVariationId,
  });
  console.log(variation);
  return (
    <>
      {translatedVariationTexts
        .filter(({ locale }) => locale === selectedLocale)
        .map((variationText) => (
          <ProductVariationsListItem
            variationText={variationText}
            variationKey={variation.key}
            {...variation}
          />
        ))}
    </>
  );
};

export default ProductVariationsList;
