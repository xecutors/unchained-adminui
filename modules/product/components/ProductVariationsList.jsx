import Accordion from '../../common/components/Accordion';
import useTranslatedProductVariationTexts from '../hooks/useTranslatedProductVariationTexts';
import ProductVariation from './ProductVariation';
import ProductVariationOptions from './ProductVariationOptions';

const ProductVariationsList = ({
  productVariationId,
  selectedLocale,
  variation,
}) => {
  const { options } = variation;
  const { translatedVariationTexts } = useTranslatedProductVariationTexts({
    productVariationId,
  });
  console.log('options', options);
  console.log('variation', variation);

  const variations = translatedVariationTexts
    .filter(({ locale }) => locale === selectedLocale)
    .map((variationText) => ({
      header: (
        <ProductVariation
          variationText={variationText}
          variationKey={variation.key}
          {...variation}
        />
      ),
      body: (
        <ProductVariationOptions
          variationId={variation._id}
          options={options}
        />
      ),
    }));

  return <Accordion containerCSS="" data={variations} />;
};

export default ProductVariationsList;
