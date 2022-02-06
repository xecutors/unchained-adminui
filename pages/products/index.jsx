import { useState } from 'react';
import { useIntl } from 'react-intl';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import Pagination from '../../modules/common/components/Pagination';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import Toggle from '../../modules/common/components/Toggle';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import ProductFilter from '../../modules/product/components/ProductFilter';
import ProductList from '../../modules/product/components/ProductList';
import useProducts from '../../modules/product/hooks/useProducts';

const index = () => {
  const { formatMessage } = useIntl();
  const [limit, setLimit] = useState(DefaultLimit);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState({});
  const [includeDrafts, setIncludeDrafts] = useState(false);

  const { products, productsCount, loadMore, loading } = useProducts({
    includeDrafts,
    limit,
    offset,
    ...filter,
  });

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'products_list_header',
          defaultMessage: 'Products',
        })}
      />
      <ProductFilter
        onFilter={({ onSearch, tag }) => {
          setFilter({
            tag,
            onSearch,
          });
        }}
      />
      <div className=" min-w-full  sm:shadow-lg   shadow overflow-hidden border-b border-gray-200  ">
        <ListHeader addPath="/products/new">
          <Toggle
            toggleText={formatMessage({
              id: 'include_drafts',
              defaultMessage: 'Include drafts',
            })}
            toggleState={includeDrafts}
            onToggle={setIncludeDrafts}
          />
        </ListHeader>
        {loading ? <Loading /> : <ProductList products={products} />}

        <Pagination
          onLoadMore={loadMore}
          data={products}
          total={productsCount}
          limit={limit}
          onLimitChange={setLimit}
          offset={offset}
          onOffsetChange={setOffset}
        />
      </div>
    </>
  );
};

export default index;
