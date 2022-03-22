import Badge from '../../common/components/Badge';

const ProductVariation = ({
  productVariationId,
  type,
  variationText,
  _id,
  options,
  variationKey,
  ...props
}) => {
  return (
    <div>
      <span>
        {' '}
        <Badge text={type} square />
      </span>
      <span> {variationText.title}</span>
      <span> {variationKey}</span>
    </div>
  );
};

export default ProductVariation;
