import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import PageHeader from '../../modules/common/components/PageHeader';
import Toggle from '../../modules/common/components/Toggle';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import ProductFilter from '../../modules/product/components/ProductFilter';
import ProductList from '../../modules/product/components/ProductList';
import useAuth from '../../modules/Auth/useAuth';
import SearchField from '../../modules/common/components/SearchField';
import {
  convertSortFieldsToQueryFormat,
  normalizeQuery,
} from '../../modules/common/utils/utils';
import LocaleWrapper from '../../modules/common/components/LocaleWrapper';
import useProductsCount from '../../modules/product/hooks/useProductsCount';
import ProductDetailPage from './ProductDetailPage';

const Products = () => {
  const { formatMessage } = useIntl();

  const { query, push } = useRouter();
  const limit = parseInt(query?.limit as string, 10) || DefaultLimit;
  const offset = parseInt(query?.skip as string, 10) || 0;
  const includeDrafts =
    query?.includeDrafts === 'true' || !query?.includeDrafts;
  const tags = (query.tags as string)?.split(',') || undefined;
  const sort = query.sort || '';
  const { hasRole } = useAuth();
  const { queryString, slug, ...restQuery } = query;

  const setQueryString = (searchString) => {
    const { skip, ...withoutSkip } = restQuery;
    if (searchString) {
      push({
        query: normalizeQuery(withoutSkip, searchString, 'queryString'),
      });
    } else {
      push({
        query: normalizeQuery(restQuery),
      });
    }
  };
  const sortKeys = convertSortFieldsToQueryFormat(sort);
  const { productsCount } = useProductsCount({
    queryString: queryString as string,
    includeDrafts,
    tags,
  });

  if (slug) return <ProductDetailPage slug={slug} />;
  return (
    <>
      <BreadCrumbs />
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <PageHeader
            headerText={formatMessage(
              (productsCount ?? 0) === 1
                ? { id: 'product_count_header_singular', defaultMessage: '1 Product' }
                : { id: 'products_count_header', defaultMessage: '{count} Products' },
              { count: productsCount ?? 0 }
            )}
          />
          <SearchField
            onInputChange={setQueryString}
            defaultValue={queryString}
          />
        </div>
        <ProductFilter />
      </div>
      <div className="min-w-full overflow-x-auto">
        <ListHeader
          addPath={hasRole('addProduct') && '/products/new'}
          addButtonText={formatMessage({
            id: 'add_product',
            defaultMessage: 'Add product',
          })}
        >
          <Toggle
            toggleText={formatMessage({
              id: 'include_drafts',
              defaultMessage: 'Include drafts',
            })}
            toggleKey="includeDrafts"
            active={includeDrafts}
          />
        </ListHeader>

        <LocaleWrapper>
          <ProductList
            sortable
            {...{ queryString, includeDrafts, limit, offset, tags, sortKeys }}
          />
        </LocaleWrapper>
      </div>
    </>
  );
};

export default Products;
