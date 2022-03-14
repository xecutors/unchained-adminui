import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import ProductListItem from './ProductReviewListItem';

const ProductList = ({ products, showAvatar = true }) => {
  const { formatMessage } = useIntl();
  return (
    <Table className="min-w-full ">
      {products?.map((product) => (
        <Table.Row key={product._id} className="bg-white " header>
          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'name',
              defaultMessage: 'Name',
            })}
          </Table.Cell>
          <Table.Cell className="pr-6  text-left text-xs font-medium sm:py-1text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'active',
              defaultMessage: 'Active',
            })}
          </Table.Cell>

          <Table.Cell className=" text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
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
