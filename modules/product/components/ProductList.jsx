import { useIntl } from 'react-intl';
import ListHeader from '../../common/components/ListHeader';
import ListPagination from '../../common/components/ListPagination';
import Toggle from '../../common/components/Toggle';
import ProductListItem from './ProductListItem';

const ProductList = ({
  products,
  total,
  onLimitChange,
  onLoadMore,
  onIncludeDraftsChange,
  includeDrafts,
}) => {
  const { formatMessage } = useIntl();

  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 ">
          <ListHeader addPath="/products/new">
            <Toggle
              toggleText={formatMessage({
                id: 'include_drafts',
                defaultMessage: 'Include drafts',
              })}
              toggleState={includeDrafts}
              onToggle={onIncludeDraftsChange}
            />
          </ListHeader>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white ">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatMessage({
                    id: 'name',
                    defaultMessage: 'Name',
                  })}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatMessage({
                    id: 'active',
                    defaultMessage: 'Active',
                  })}
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatMessage({
                    id: 'tags',
                    defaultMessage: 'Tags',
                  })}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products?.map((product) => (
                <ProductListItem key={product?._id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ListPagination
        onLoadMore={onLoadMore}
        data={products}
        total={total}
        onLimitChange={onLimitChange}
      />
    </div>
  );
};

export default ProductList;
