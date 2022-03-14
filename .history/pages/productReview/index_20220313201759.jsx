import { useState } from 'react';
import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import Pagination from '../../modules/common/components/Pagination';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import Toggle from '../../modules/common/components/Toggle';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
// import ProductFilter from '../../modules/product/components/ProductFilter';
import ProductReviewList from '../../modules/product-review/components/productReviewList';
// import useProductReview from '../../modules/product-review/hooks/useProductReview';

const ProductsReview = () => {
  const { formatMessage } = useIntl();
  // const [filter, setFilter] = useState({});
  const { query } = useRouter();
  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;
  // const includeDrafts = query?.includeDrafts === 'true';

  // const { ProductReview,  error, loading } = useProductReview({
  //   // includeDrafts,
  //   limit,
  //   offset,
  //   // ...filter,
  // });



  return (
    <>
      <BreadCrumbs />
      <div className="justify-between w-full">
        <PageHeader
          headerText={formatMessage({
            id: 'products_list_header',
            defaultMessage: 'ProductsReview',
          })}
        />
        {/* <ProductFilter
          onFilter={({ queryString, tags }) => {
            setFilter({
              tags,
              queryString,
            });
          }}
      /> */}
      </div>
      <div className="min-w-full overflow-hidden">
        {/* <ListHeader addPath="/products/new"> */}
          {/* <Toggle
            toggleText={formatMessage({
              id: 'include_drafts',
              defaultMessage: 'Include drafts',
            })}
            toggleKey="includeDrafts"
          /> */}
        {/* </ListHeader> */}
        {
        // loading ? <Loading /> : 
        <ProductReviewList ProductReview={Productreview} />}

        {/* <Pagination
          onLoadMore={loadMore}
          data={ProductReview}
          // total={productsCount}
        /> */}
      </div>
    </>
  );
};

export default ProductsReview;
