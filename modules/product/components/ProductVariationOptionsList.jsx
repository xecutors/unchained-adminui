import useCreateProductVariationOption from '../hooks/useCreateProductVariationOption';
import useRemoveProductVariationOption from '../hooks/useRemoveProductVariationOption';
import ProductVariationOptionForm from './ProductVariationOptionForm';
import ProductVariationOptionItem from './ProductVariationOptionItem';

const ProductVariationOptionsList = ({ variationId, options }) => {
  const { removeProductVariationOption } = useRemoveProductVariationOption();
  const { createProductVariationOption } = useCreateProductVariationOption();

  const onSubmit = async ({ value, title }) => {
    await createProductVariationOption({
      productVariationId: variationId,
      value,
      title,
    });
  };

  return (
    <div>
      <ProductVariationOptionForm onSubmit={onSubmit} />
      {options.map((option) => (
        <ProductVariationOptionItem option={option} />
      ))}
    </div>
  );
};

export default ProductVariationOptionsList;
