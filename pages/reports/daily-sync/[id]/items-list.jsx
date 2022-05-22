import { ArrowLeftIcon } from '@heroicons/react/outline';
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
    removedProducts,
    updatedFilters,
    newAssortments,
    updatedAssortments,
    removedAssortments,
    newFilters,
    updatedProducts,
    removedFilters,
  } = list;

  if (selectedView === 'new-assortments')
    return <AssortmentAlphabeticalList dictionary={newAssortments} />;
  if (selectedView === 'update-assortments')
    return <AssortmentAlphabeticalList dictionary={updatedAssortments} />;
  if (selectedView === 'removed-assortments')
    return (
      <AssortmentAlphabeticalList
        enableRedirect={false}
        dictionary={removedAssortments}
      />
    );
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
    return (
      <FiltersAlphabeticalList
        enableRedirect={false}
        dictionary={removedFilters}
      />
    );

  return <AssortmentAlphabeticalList dictionary={newAssortments} />;
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

  const { query, back } = useRouter();
  const { id } = query;

  const { work, loading } = useWork({ workId: id });

  if (loading || !work) return <Loading />;

  const { sync } = work.result || {};
  const { stats } = sync || {};
  const { categories, products, filters } = stats || {};

  const newAssortments = sortArrayAlphabetically(
    categories?.newItems || categories?.newCategories,
    'title',
    true,
  );
  const updatedAssortments = sortArrayAlphabetically(
    categories?.updatedItems || categories.updatedCategories,
    'title',
    true,
  );

  const removedAssortments = sortArrayAlphabetically(
    categories?.removedItems || categories?.removedCategories,
    'title',
    true,
  );
  const newProducts = sortArrayAlphabetically(
    products?.newItems,
    'title',
    true,
  );
  const updatedProducts = sortArrayAlphabetically(
    products?.updatedItems,
    'title',
    true,
  );

  const removedProducts = sortArrayAlphabetically(
    products?.removedItems,
    'title',
    true,
  );
  const newFilters = sortArrayAlphabetically(filters?.newItems, 'key', true);
  const updatedFilters = sortArrayAlphabetically(
    filters?.updatedItems,
    'key',
    true,
  );
  const removedFilters = sortArrayAlphabetically(
    filters?.removedItems,
    'key',
    true,
  );

  const dailySyncItemReportOptions = [
    {
      id: 'new-assortments',
      title: formatMessage({
        id: 'new_assortments',
        defaultMessage: 'New Assortments',
      }),
      length: Object.values(newAssortments).flat().length,
    },
    {
      id: 'updated-assortments',
      title: formatMessage({
        id: 'updated_assortments',
        defaultMessage: 'Updated Assortments',
      }),
      length: Object.values(updatedAssortments).flat().length,
    },
    {
      id: 'removed-assortments',
      title: formatMessage({
        id: 'removed_assortments',
        defaultMessage: 'Removed Assortments',
      }),
      length: Object.values(removedAssortments).flat().length,
    },
    {
      id: 'new-products',
      title: formatMessage({
        id: 'new_products',
        defaultMessage: 'New Products',
      }),
      length: Object.values(newProducts).flat().length,
    },
    {
      id: 'updated-products',
      title: formatMessage({
        id: 'updated_products',
        defaultMessage: 'Updated Products',
      }),
      length: Object.values(updatedProducts).flat().length,
    },
    {
      id: 'removed-products',
      title: formatMessage({
        id: 'deleted_products',
        defaultMessage: 'Deleted products',
      }),
      length: Object.values(removedProducts).flat().length,
    },
    {
      id: 'new-filters',
      title: formatMessage({
        id: 'new_filters',
        defaultMessage: 'New Filters',
      }),
      length: Object.values(newFilters).flat().length,
    },
    {
      id: 'updated-filters',
      title: formatMessage({
        id: 'updated_filters',
        defaultMessage: 'Updated filters',
      }),
      length: Object.values(updatedFilters).flat().length,
    },
    {
      id: 'removed-filters',
      title: formatMessage({
        id: 'removed_filters',
        defaultMessage: 'Removed filters',
      }),
      length: Object.values(removedFilters).flat().length,
    },
  ];

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'synced_items_report',
          defaultMessage: 'Synced items report',
        })}
      />
      <span>
        <button
          type="button"
          className="inline-flex items-center justify-center px-2 py-2 hover:bg-yellow-100 dark:hover:bg-yellow-700 rounded-full"
          onClick={() => back()}
        >
          <ArrowLeftIcon className="h-6 w-6 text-teal-600 hover:text-teal-800" />
        </button>
      </span>
      <Tab tabItems={dailySyncItemReportOptions} defaultTab="new-assortments">
        <Wrapper
          list={{
            newAssortments,
            removedAssortments,
            newFilters,
            newProducts,
            updatedAssortments,
            updatedFilters,
            removedFilters,
            updatedProducts,
            removedProducts,
          }}
        />
      </Tab>
    </>
  );
};

export default DailyAnalyticsReportList;
