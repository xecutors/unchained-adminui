import useCreateProductVariation from '../hooks/useCreateProductVariation';
import useProductVariations from '../hooks/useProductVariations';
import ProductVariationForm from './ProductVariationForm';

import ProductVariationsList from './ProductVariationsList';

export const userCalculation = {
  color_picker: 'Color Picker',
  text_answers: 'Text Answers',
};

const VariationForm = ({ productId, selectedLocale }) => {
  const { createProductVariation } = useCreateProductVariation();

  const { variations } = useProductVariations({ productId });

  const onSubmit = async ({ title, key, type }) => {
    await createProductVariation({ productId, key, type, title });
  };
  return (
    <div className="mt-6 overflow-hidden border-b rounded-md">
      <div className="lg:grid lg:grid-cols-4">
        <div className="lg:col-span-2 mb-5 lg:pr-5">
          <ProductVariationForm onSubmit={onSubmit} />
        </div>
        <div className="col-span-2 lg:w-full ml-auto shadow-md border-gray-200 bg-white px-8">
          <div className="py-4 divide-y divide-gray-200">
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

export default VariationForm;
