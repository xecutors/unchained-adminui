import AssortmentProductListItem from './AssortmentProductListItem';

const AssortmentProductsList = ({ products, onRemoveProduct }) => {
  return products.map((product) => (
    <AssortmentProductListItem
      key={product._id}
      product={product}
      onDelete={onRemoveProduct}
    />
  ));
};

export default AssortmentProductsList;
