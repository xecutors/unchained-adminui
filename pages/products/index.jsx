import { useState } from 'react';
import { useIntl } from 'react-intl';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListPagination from '../../modules/common/components/ListPagination';
import PageHeader from '../../modules/common/components/PageHeader';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import ProductList from '../../modules/product/components/ProductList';
import useProducts from '../../modules/product/hooks/useProducts';

const index = () => {
  const { formatMessage } = useIntl();
  const [limit, setLimit] = useState(DefaultLimit);
  const [includeDrafts, setIncludeDrafts] = useState(false);

  const { products, productsCount, loadMore, loading } = useProducts({
    includeDrafts,
    limit,
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
      <div className=" inline-block min-w-full    shadow overflow-hidden border-b border-gray-200  ">
        <ProductList
          isLoading={loading}
          onLimitChange={setLimit}
          includeDrafts={includeDrafts}
          onIncludeDraftsChange={setIncludeDrafts}
          products={products}
          onLoadMore={loadMore}
          total={productsCount}
        />
        <ListPagination
          isLoading={loading}
          onLoadMore={loadMore}
          data={products}
          total={productsCount}
          onLimitChange={setLimit}
        />
      </div>
    </>
  );
};

export default index;
