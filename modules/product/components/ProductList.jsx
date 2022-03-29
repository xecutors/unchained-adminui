import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import ProductListItem from './ProductListItem';

const ProductList = ({ products, showAvatar = true }) => {
  const { formatMessage } = useIntl();
  return (
    <Table className="min-w-full ">
      {products?.map((product) => (
        <Table.Row key={product._id} header>
          <Table.Cell>
            {formatMessage({
              id: 'name',
              defaultMessage: 'Name',
            })}
          </Table.Cell>
          <Table.Cell>
            {formatMessage({
              id: 'active',
              defaultMessage: 'Active',
            })}
          </Table.Cell>

          <Table.Cell>
            {formatMessage({
              id: 'tags',
              defaultMessage: 'Tags',
            })}
          </Table.Cell>
        </Table.Row>
      ))}

      {products?.map((product) => (
        <ProductListItem
          key={`${product?._id}-body`}
          product={product}
          showAvatar={showAvatar}
        />
      ))}
    </Table>
  );
};

export default ProductList;
