import { useIntl } from 'react-intl';
import ListHeader from '../common/components/ListHeader';
import ListPagination from '../common/components/ListPagination';
import ProductListItem from './ProductListItem';

const ProductList = ({
  products,
  total,
  onLimitChange,
  onLoadMore,
  onSearch,
}) => {
  const { formatMessage } = useIntl();

  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 ">
          <div className="w-full">
            <label htmlFor="search" className="sr-only">
              {formatMessage({ id: 'search', defaultMessage: 'Search' })}
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => onSearch(e.target.value)}
                id="search"
                name="search"
                className="block w-full bg-white border border-gray-300 text-sm rounded-md py-2 pl-10 pr-3 "
                placeholder="Search"
                type="search"
              />
            </div>
          </div>

          <ListHeader addPath="/products/new" />
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white ">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatMessage({
                    id: 'name',
                    defaultMessage: 'Name',
                  })}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatMessage({
                    id: 'active',
                    defaultMessage: 'Active',
                  })}
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
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
