import { useState } from 'react';
import { useIntl } from 'react-intl';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import ProductList from '../../modules/product/components/ProductList';
import useProducts from '../../modules/product/hooks/useProducts';

const index = () => {
  const { formatMessage } = useIntl();
  const [limit, setLimit] = useState(DefaultLimit);
  const [includeDrafts, setIncludeDrafts] = useState(false);

  const { products, productsCount, loadMore } = useProducts({
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
      <ProductList
        onLimitChange={setLimit}
        includeDrafts={includeDrafts}
        onIncludeDraftsChange={setIncludeDrafts}
        products={products}
        onLoadMore={loadMore}
        total={productsCount}
      />
    </>
  );
};

export default index;
