import { useIntl } from 'react-intl';
import NoData from '../../common/components/NoData';
import AssortmentProductListItem from './AssortmentProductListItem';

const AssortmentProductsList = ({ products, onRemoveProduct }) => {
  const { formatMessage } = useIntl();
  return products.length ? (
    products.map((product) => (
      <AssortmentProductListItem
        key={product._id}
        link={product}
        onDelete={onRemoveProduct}
      />
    ))
  ) : (
    <NoData
      message={formatMessage({
        id: 'message_product',
        defaultMessage: 'Assigned Products',
      })}
    />
  );
};

export default AssortmentProductsList;
