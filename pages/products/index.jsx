import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import PageHeader from '../../modules/common/components/PageHeader';
import Toggle from '../../modules/common/components/Toggle';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import ProductFilter from '../../modules/product/components/ProductFilter';
import ProductList from '../../modules/product/components/ProductList';
import ACTION_ROLES from '../../modules/common/data/roles';
import useAuth from '../../modules/Auth/useAuth';
import SearchField from '../../modules/common/components/SearchField';
import {
  convertSortFieldsToQueryFormat,
  normalizeQuery,
} from '../../modules/common/utils/utils';
import LocaleWrapper from '../../modules/common/components/LocaleWrapper';

const Products = () => {
  const { formatMessage } = useIntl();

  const { query, push } = useRouter();
  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;
  const includeDrafts =
    query?.includeDrafts === 'true' || !query?.includeDrafts;
  const tags = query.tags?.split(',') || undefined;
  const sort = query.sort || '';
  const { hasRole } = useAuth();
  const { queryString, ...restQuery } = query;

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

  return (
    <>
      <BreadCrumbs />
      <div className="w-full py-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <PageHeader
            headerText={formatMessage({
              id: 'products_list_header',
              defaultMessage: 'Products',
            })}
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
          addPath={hasRole(ACTION_ROLES.products.create) && '/products/new'}
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
            {...{ queryString, includeDrafts, limit, offset, tags, sortKeys }}
          />
        </LocaleWrapper>
      </div>
    </>
  );
};

export default Products;
