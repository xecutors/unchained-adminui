import Badge from '../../common/components/Badge';

const ProductVariation = ({ type, variationText, variationKey }) => {
  return (
    <div>
      <span>
        <Badge text={type} square />
      </span>
      <span> {variationText.title}</span>
      <span> {variationKey}</span>
    </div>
  );
};

export default ProductVariation;
