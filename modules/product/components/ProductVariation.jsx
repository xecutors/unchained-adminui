import useCreateProductVariation from '../hooks/useCreateProductVariation';
import useProductVariations from '../hooks/useProductVariations';
import ProductVariationForm from './ProductVariationForm';

import ProductVariationsList from './ProductVariationsList';

const ProductVariation = ({ productId, selectedLocale }) => {
  const { createProductVariation } = useCreateProductVariation();

  const { variations } = useProductVariations({
    productId,
    locale: selectedLocale,
  });

  const onSubmit = async ({ title, key, type }) => {
    await createProductVariation({ productId, key, type, title });
  };

  return (
    <div className="mt-6 overflow-hidden rounded-md border-b">
      <div className="lg:grid lg:grid-cols-12">
        <div className="mb-5 lg:col-span-5 lg:pr-5">
          <ProductVariationForm onSubmit={onSubmit} />
        </div>
        <div className="col-span-7 ml-auto border-gray-200 bg-white px-8 shadow-md lg:w-full">
          <div className="divide-y divide-gray-200 py-4">
            {variations?.map((variation) => (
              <ProductVariationsList
                selectedLocale={selectedLocale}
                productVariationId={variation._id}
                key={variation._id}
                variation={variation}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductVariation;
