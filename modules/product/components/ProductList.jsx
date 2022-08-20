import { useIntl } from 'react-intl';
import Loading from '../../common/components/Loading';
import Pagination from '../../common/components/Pagination';
import Table from '../../common/components/Table';
import useProducts from '../hooks/useProducts';
import ProductListItem from './ProductListItem';

const ProductList = ({
  showAvatar = true,
  queryString,
  limit,
  offset,
  tags,
  sortKeys,
  selectedLocale,
  includeDrafts,
}) => {
  const { formatMessage } = useIntl();
  const { products, productsCount, loading } = useProducts({
    queryString,
    includeDrafts,
    limit,
    offset,
    tags,
    sort: sortKeys,
    forceLocale: selectedLocale,
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
              <Table.Cell>
                {formatMessage({
                  id: 'sequence',
                  defaultMessage: 'Sequence',
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
      )}
      <Pagination data={products} total={productsCount} />
    </>
  );
};

export default ProductList;
