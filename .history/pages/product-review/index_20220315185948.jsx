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
import useProductReviews from '../../modules/product/hooks/useProductReviews';

const ProductReview = () => {
  const { formatMessage } = useIntl();
  // const [filter, setFilter] = useState({});
  const { query } = useRouter();
  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;
   const includeDrafts = query?.includeDrafts === 'true';

   const {reviews,  error, loading } = useProductReviews({
      includeDrafts,
     limit,
     offset,
    // ...filter,
   });
  const ProductReviews = [{
    _id:'1',
    created:'1/2/2002',
    updated:'1/2/2009',
    deleted:'2/3/2005',
    author:
      {
      _id:'2',
      username:'amen',
      isGuest='yes',
      avatar :{
        _id='4',
        url='fgh',
      },
    },
    
    product: {
      _id='5',
      texts :{
        _id='7',
        title='Attends® Soft 1 Mini',
        subtitle='Attends®',
      },
      media:{
        _id='7',
        file : {
          _id='9',
          url='hjkhj',
        }
      }
    },
    rating='5',
    title='very good',
    upVote:'4',                  //voteCount(type: UPVOTE)
    downVote:'5',                    //voteCount(type: DOWNVOTE)
    voteReport:'7' ,                   //voteCount(type: REPORT)
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
        {loading ? <Loading /> :  <ProductReviewList productReviews={ProductReviews} />}

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
