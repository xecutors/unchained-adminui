import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import AssortmentAlphabeticalList from '../../../../modules/assortment/components/AssortmentAlphabeticalList';
import BreadCrumbs from '../../../../modules/common/components/BreadCrumbs';
import Loading from '../../../../modules/common/components/Loading';
import PageHeader from '../../../../modules/common/components/PageHeader';
import Tab from '../../../../modules/common/components/Tab';
import FiltersAlphabeticalList from '../../../../modules/filter/components/FiltersAlphabeticalList';
import ProductsAlphabeticalList from '../../../../modules/product/components/ProductsAlphabeticalList';
import useWork from '../../../../modules/work/hooks/useWork';
import sortArrayAlphabetically from '../../util/sortArrayAlphabetically';

const GetCurrentTab = ({ list, selectedView }) => {
  if (!list) return <Loading />;
  const {
    newProducts,
    updatedProducts,
    removedProducts,
    newAssortments,
    updatedAssortments,
    removedAssortments,
    newFilters,
    updatedFilters,
    removedFilters,
  } = list;

  if (selectedView === 'new-assortments')
    return <AssortmentAlphabeticalList dictionary={newAssortments} />;
  if (selectedView === 'updated-assortments')
    return <AssortmentAlphabeticalList dictionary={updatedAssortments} />;
  if (selectedView === 'removed-assortments')
    return <AssortmentAlphabeticalList dictionary={removedAssortments} />;
  if (selectedView === 'new-products')
    return <ProductsAlphabeticalList dictionary={newProducts} />;
  if (selectedView === 'updated-products')
    return <ProductsAlphabeticalList dictionary={updatedProducts} />;
  if (selectedView === 'removed-products')
    return <ProductsAlphabeticalList dictionary={removedProducts} />;
  if (selectedView === 'new-filters')
    return <FiltersAlphabeticalList dictionary={newFilters} />;
  if (selectedView === 'updated-filters')
    return <FiltersAlphabeticalList dictionary={updatedFilters} />;
  if (selectedView === 'removed-filters')
    return <FiltersAlphabeticalList dictionary={removedFilters} />;

  return <AssortmentAlphabeticalList dictionary={updatedAssortments} />;
};

const Wrapper = ({ selectedView, list }) => {
  const router = useRouter();
  const { formatMessage } = useIntl();

  const { searchKey = '' } = router.query;

  const handleOnChange = (e) => {
    const query = { ...router.query };
    if (e.target.value) query.searchKey = e.target.value;
    else delete query.searchKey;
    router.push({
      query,
    });
  };

  return (
    <div>
      <div className="mt-4 mb-4">
        <input
          type="text"
          name="search"
          className="block w-full dark:bg-slate-600 dark:text-white dark:placeholder:text-white rounded-md border-slate-300 shadow-sm focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
          onChange={handleOnChange}
          autoComplete="off"
          value={searchKey}
          id="search"
          placeholder={formatMessage({
            id: 'search_anything',
            defaultMessage: 'Search anything',
          })}
        />
      </div>
      <GetCurrentTab
        list={list}
        selectedView={selectedView}
        defaultTab="new-assortments"
      />
    </div>
  );
};

const DailyAnalyticsReportList = () => {
  const { formatMessage } = useIntl();

  const dailySyncItemReportOptions = [
    {
      id: 'new-assortments',
      title: formatMessage({
        id: 'new_assortments',
        defaultMessage: 'New Assortments',
      }),
    },
    {
      id: 'updated-assortments',
      title: formatMessage({
        id: 'updated_assortments',
        defaultMessage: 'Updated Assortments',
      }),
    },
    {
      id: 'removed-assortments',
      title: formatMessage({
        id: 'removed_assortments',
        defaultMessage: 'Removed Assortments',
      }),
    },
    {
      id: 'new-products',
      title: formatMessage({
        id: 'new_products',
        defaultMessage: 'New Products',
      }),
    },
    {
      id: 'updated-products',
      title: formatMessage({
        id: 'updated_products',
        defaultMessage: 'Updated Products',
      }),
    },
    {
      id: 'removed-products',
      title: formatMessage({
        id: 'deleted_products',
        defaultMessage: 'Deleted products',
      }),
    },
    {
      id: 'new-filters',
      title: formatMessage({
        id: 'new_filters',
        defaultMessage: 'New Filters',
      }),
    },
    {
      id: 'updated-filters',
      title: formatMessage({
        id: 'updated_filters',
        defaultMessage: 'Updated filters',
      }),
    },
    {
      id: 'removed-filters',
      title: formatMessage({
        id: 'removed_filters',
        defaultMessage: 'Removed filters',
      }),
    },
  ];
  const { query } = useRouter();

  const { id } = query;

  const { work, loading } = useWork({ workId: id });

  if (loading || !work) return <Loading />;

  const { sync } = work.result || {};
  const { stats } = sync || {};
  const { categories, products, filters } = stats || {};

  const newAssortments = sortArrayAlphabetically(
    categories?.newCategories,
    'title',
    true,
  );

  const removedAssortments = sortArrayAlphabetically(
    categories?.removedCategories,
    'title',
    true,
  );

  /*   const updatedAssortments = sortArrayAlphabetically(
    categories?.updated,
    'title',
    true,
  ); */
  const newProducts = sortArrayAlphabetically(
    products?.newItems,
    'title',
    true,
  );
  /*   const updatedProducts = sortArrayAlphabetically(
    products?.updated,
    'title',
    true,
  ); */
  const removedProducts = sortArrayAlphabetically(
    products?.removedItems,
    'title',
    true,
  );
  const newFilters = sortArrayAlphabetically(filters?.newItems, 'key', true);
  const removedFilters = sortArrayAlphabetically(
    filters?.removedItems,
    'key',
    true,
  );
  /* const updatedFilters = sortArrayAlphabetically(filters?.updated, 'key', true); */

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'synced_items_report',
          defaultMessage: 'Synced items report',
        })}
      />
      <Tab tabItems={dailySyncItemReportOptions} defaultTab="new-assortments">
        <Wrapper
          list={{
            newAssortments,
            removedAssortments,
            newFilters,
            newProducts,

            updatedAssortments: [],
            updatedFilters: [],
            removedFilters,
            updatedProducts: [],
            removedProducts,
          }}
        />
      </Tab>
    </>
  );
};

export default DailyAnalyticsReportList;
