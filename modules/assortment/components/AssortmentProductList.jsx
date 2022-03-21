import NoData from '../../common/components/NoData';
import AssortmentProductListItem from './AssortmentProductListItem';

const AssortmentProductsList = ({ products, onRemoveProduct }) => {
  return products.length ? (
    products.map((product) => (
      <AssortmentProductListItem
        key={product._id}
        link={product}
        onDelete={onRemoveProduct}
      />
    ))
  ) : (
    <NoData message="Assigned Products" />
  );
};

export default AssortmentProductsList;
