import useRemoveProductVariationOption from '../hooks/useRemoveProductVariationOption';

const ProductVariationOptionItem = ({ option }) => {
  const { removeProductVariationOption } = useRemoveProductVariationOption();

  return (
    <div>
      <span> {option.value}</span>
      <span> {option.texts?.title}</span>
      <span> {option.texts?.subtitle}</span>
    </div>
  );
};

export default ProductVariationOptionItem;
