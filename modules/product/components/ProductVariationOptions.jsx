const ProductVariationOptions = ({ productVariationId, options, ...props }) => {
  return (
    <div>
      {options.map((option) => (
        <div key={option._id}>
          <span> {option.value}</span>
          <span> {option.texts?.title}</span>
          <span> {option.texts?.subtitle}</span>
        </div>
      ))}
    </div>
  );
};

export default ProductVariationOptions;
