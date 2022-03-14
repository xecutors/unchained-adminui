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
import useProductReview from '../../modules/product-review/hooks/useProductReview';
import useProductReviews from '../../modules/product/hooks/useProductReviews';

const ProductReview = () => {
  const { formatMessage } = useIntl();
  // const [filter, setFilter] = useState({});
  const { query } = useRouter();
  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;
   const includeDrafts = query?.includeDrafts === 'true';

   const {  error, loading } = useProductReviews({
      includeDrafts,
     limit,
     offset,
    // ...filter,
   });
  const ProductReview = [{

    _id:"1",
    title:"MoliCare® Premium Lady Pad 0.5",
    author:"jone",
    rating:"4",
  },
  {

    id:"2",
    title:"Attends® Soft 1 Mini",
    author:"biniyam",
    rating:"4",
  },
  {
  id:"3",
  title:"Attends® Soft 1 Mini",
  author:"biniyam",
  rating:"4",
},


]
  return (
    <>
      <BreadCrumbs />
      <div className="justify-between w-full">
        <PageHeader
          headerText={formatMessage({
            id: 'products_list_header',
            defaultMessage: 'Product Review',
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
        {/* { <ListHeader addPath="/products/new"> }
          { <Toggle
            toggleText={formatMessage({
              id: 'include_drafts',
              defaultMessage: 'Include drafts',
            })}
            toggleKey="includeDrafts"
          /> }
         </ListHeader> } */}
        {loading ? <Loading /> :  <ProductReviewList ProductReview={ProductReview} />}

        <Pagination
          //  onLoadMore={loadMore}
          data={ProductReview}
          // total={productsCount}
        />
      </div>
    </>
  );
};

export default ProductReview;
