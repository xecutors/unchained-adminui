import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import BreadCrumbs from '../../../../modules/common/components/BreadCrumbs';
import Loading from '../../../../modules/common/components/Loading';
import PageHeader from '../../../../modules/common/components/PageHeader';
import Tab from '../../../../modules/common/components/Tab';
import FiltersAlphabeticalList from '../../../../modules/sync/components/FiltersAlphabeticalList';
import ProductsAlphabeticalList from '../../../../modules/sync/components/ProductsAlphabeticalList';
import AssortmentAlphabeticalList from '../../../../modules/sync/components/AssortmentAlphabeticalList';
import useWork from '../../../../modules/work/hooks/useWork';
import useDailySyncItems from '../../../../modules/sync/hooks/useDailySyncItems';

const GetCurrentTab = ({ selectedView, workId }) => {
  const { items } = useDailySyncItems({ workId, itemKey: selectedView });

  if (selectedView === 'newAssortments')
    return <AssortmentAlphabeticalList items={items} />;
  if (selectedView === 'updatedAssortments')
    return <AssortmentAlphabeticalList items={items} />;
  if (selectedView === 'removedAssortments')
    return <AssortmentAlphabeticalList items={items} enableRedirect={false} />;
  if (selectedView === 'newProducts')
    return <ProductsAlphabeticalList items={items} />;
  if (selectedView === 'updatedProducts')
    return <ProductsAlphabeticalList items={items} />;
  if (selectedView === 'removedProducts')
    return <ProductsAlphabeticalList items={items} enableRedirect={false} />;
  if (selectedView === 'newFilters')
    return <FiltersAlphabeticalList items={items} />;
  if (selectedView === 'updatedFilters')
    return <FiltersAlphabeticalList items={items} />;
  if (selectedView === 'removedFilters')
    return <FiltersAlphabeticalList items={items} enableRedirect={false} />;

  return <AssortmentAlphabeticalList items={items} />;
};

const Wrapper = ({ selectedView, workId }) => {
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
          className="block w-full dark:bg-slate-600 text-slate-600 dark:text-white dark:placeholder:text-white rounded-md border-slate-300 shadow-sm focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
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
      <GetCurrentTab selectedView={selectedView} workId={workId} />
    </div>
  );
};

const DailyAnalyticsReportList = () => {
  const { formatMessage } = useIntl();

  const { query, push } = useRouter();
  const { id } = query;

  const { work, loading } = useWork({ workId: id });

  if (loading || !work) return <Loading />;

  const { sync } = work.result || {};
  const { stats } = sync || {};

  const dailySyncItemReportOptions = [
    {
      id: 'newAssortments',
      title: formatMessage({
        id: 'new_assortments',
        defaultMessage: 'New Assortments',
      }),
      length: stats.categories.new,
    },
    {
      id: 'updatedAssortments',
      title: formatMessage({
        id: 'updated_assortments',
        defaultMessage: 'Updated Assortments',
      }),
      length: stats.categories.updated,
    },
    {
      id: 'removedAssortments',
      title: formatMessage({
        id: 'removed_assortments',
        defaultMessage: 'Removed Assortments',
      }),
      length: stats.categories.removed,
    },
    {
      id: 'newProducts',
      title: formatMessage({
        id: 'new_products',
        defaultMessage: 'New Products',
      }),
      length: stats.products.new,
    },
    {
      id: 'updatedProducts',
      title: formatMessage({
        id: 'updated_products',
        defaultMessage: 'Updated Products',
      }),
      length: stats.products.updated,
    },
    {
      id: 'removedProducts',
      title: formatMessage({
        id: 'deleted_products',
        defaultMessage: 'Deleted products',
      }),
      length: stats.products.removed,
    },
    {
      id: 'newFilters',
      title: formatMessage({
        id: 'new_filters',
        defaultMessage: 'New Filters',
      }),
      length: stats.filters.new,
    },
    {
      id: 'updatedFilters',
      title: formatMessage({
        id: 'updated_filters',
        defaultMessage: 'Updated filters',
      }),
      length: stats.filters.updated,
    },
    {
      id: 'removedFilters',
      title: formatMessage({
        id: 'removed_filters',
        defaultMessage: 'Removed filters',
      }),
      length: stats.filters.removed,
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
          onClick={() =>
            push(`/reports/daily-sync/${id}`, undefined, { shallow: true })
          }
        >
          <ArrowLeftIcon className="h-6 w-6 text-teal-600 hover:text-teal-800" />
        </button>
      </span>
      <Tab tabItems={dailySyncItemReportOptions} defaultTab="newAssortments">
        <Wrapper workId={id} />
      </Tab>
    </>
  );
};

export default DailyAnalyticsReportList;
